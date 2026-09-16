"use client";

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type Announcements, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import ToolLayout from "./tool-layout";
import { decodeImage, formatBytes, isAnimatedWebP, releaseImage, validateInput, type ImageInfo } from "./image-utils";

type SelectedImage = { id: string; file: File; info: ImageInfo };
type PageSize = "fit" | "a4" | "letter";
type Settings = { pageSize: PageSize; marginMode: "none" | "custom"; marginMm: number; orientation: "auto" | "portrait" | "landscape" };
type Result = { blob: Blob; url: string; pages: number; previewUrl: string; previewRatio: number };
const accepted = ["image/jpeg", "image/png", "image/webp"];
const defaultSettings: Settings = { pageSize: "fit", marginMode: "none", marginMm: 0, orientation: "auto" };

function imageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => { const image = new Image(); image.src = url; image.onload = () => resolve(image); image.onerror = () => reject(new Error("This image could not be read.")); });
}

async function orientedImage(item: SelectedImage): Promise<{ dataUrl: string; width: number; height: number; format: "JPEG" | "PNG" }> {
  let source: ImageBitmap | HTMLImageElement;
  if (typeof createImageBitmap === "function") { try { source = await createImageBitmap(item.file, { imageOrientation: "from-image" }); } catch { source = await imageFromUrl(item.info.url); } } else source = await imageFromUrl(item.info.url);
  const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
  try {
    const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
    const context = canvas.getContext("2d"); if (!context) throw new Error("Your browser could not prepare this image.");
    context.drawImage(source, 0, 0);
    const format = item.file.type === "image/png" ? "PNG" : "JPEG";
    return { dataUrl: canvas.toDataURL(format === "PNG" ? "image/png" : "image/jpeg", 1), width, height, format };
  } finally { if ("close" in source) source.close(); }
}

function moveItem(items: SelectedImage[], activeId: string, overId: string): SelectedImage[] {
  const oldIndex = items.findIndex((item) => item.id === activeId); const newIndex = items.findIndex((item) => item.id === overId);
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return items;
  const next = [...items]; const [item] = next.splice(oldIndex, 1); next.splice(newIndex, 0, item); return next;
}

const announcements: Announcements = {
  onDragStart({ active }) { return `Picked up image ${Number(active.data.current?.sortable?.index) + 1}. Use arrow keys to move it, Space to drop, or Escape to cancel.`; },
  onDragOver({ over }) { return over ? `Image moved to position ${Number(over.data.current?.sortable?.index) + 1}.` : "Image is not over a position."; },
  onDragEnd({ over }) { return over ? `Image dropped at position ${Number(over.data.current?.sortable?.index) + 1}.` : "Image dropped."; },
  onDragCancel() { return "Image movement cancelled."; },
};

function SortableImageRow({ item, index, onRemove, disabled, activeId, overId }: { item: SelectedImage; index: number; onRemove: () => void; disabled: boolean; activeId: string | null; overId: string | null }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, disabled });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`image-list-item${isDragging ? " is-dragging" : ""}${overId === item.id && activeId !== item.id ? " is-drop-target" : ""}`}>
    <button className="drag-handle" type="button" aria-label={`Reorder ${item.file.name}, currently position ${index + 1}`} {...attributes} {...listeners} disabled={disabled}><span aria-hidden="true" className="drag-dots">{Array.from({ length: 6 }, (_, dot) => <i key={dot} />)}</span></button>
    <img src={item.info.url} alt="" />
    <div className="selected-file-details"><strong title={item.file.name}>{item.file.name}</strong></div>
    <button className="remove-button" type="button" onClick={onRemove} disabled={disabled} aria-label={`Remove ${item.file.name}`}>Remove</button>
  </div>;
}

export default function ImagesToPdf() {
  const [items, setItems] = useState<SelectedImage[]>([]); const [settings, setSettings] = useState<Settings>(defaultSettings); const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false); const [activeId, setActiveId] = useState<string | null>(null); const [overId, setOverId] = useState<string | null>(null); const [status, setStatus] = useState(""); const [error, setError] = useState("");
  const itemsRef = useRef(items); const resultRef = useRef<Result | null>(null); const abortRef = useRef<AbortController | null>(null); const headingRef = useRef<HTMLHeadingElement | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { let mounted = true; return () => { mounted = false; setTimeout(() => { if (!mounted) itemsRef.current.forEach((item) => releaseImage(item.info)); }, 0); }; }, []);
  useEffect(() => { resultRef.current = result; document.documentElement.style.setProperty("--pdf-preview-url", result ? `url("${result.previewUrl}")` : "none"); document.documentElement.style.setProperty("--pdf-preview-ratio", result ? String(result.previewRatio) : "auto"); return () => { document.documentElement.style.removeProperty("--pdf-preview-url"); document.documentElement.style.removeProperty("--pdf-preview-ratio"); }; }, [result]); useEffect(() => () => { if (resultRef.current) URL.revokeObjectURL(resultRef.current.url); }, []);
  useEffect(() => { if (result && headingRef.current) headingRef.current.focus({ preventScroll: true }); }, [result]);

  function clearResult() { if (resultRef.current) URL.revokeObjectURL(resultRef.current.url); resultRef.current = null; setResult(null); }
  function changeSettings(patch: Partial<Settings>) { setSettings((current) => ({ ...current, ...patch })); clearResult(); }
  async function addFiles(files: File[]) {
    setError(""); setStatus(""); clearResult(); const additions: SelectedImage[] = [];
    for (const file of files) { const validationError = validateInput(file, accepted); if (validationError) { setError(`${file.name}: ${validationError}`); continue; } if (await isAnimatedWebP(file)) { setError(`${file.name}: animated WebP files are not supported.`); continue; } try { additions.push({ id: crypto.randomUUID(), file, info: await decodeImage(file) }); } catch (decodeError) { setError(`${file.name}: ${decodeError instanceof Error ? decodeError.message : "This image could not be decoded."}`); } }
    if (additions.length) { setItems((current) => [...current, ...additions]); setStatus(`${additions.length} image${additions.length === 1 ? "" : "s"} ready.`); }
  }
  function removeAt(id: string) { const removed = itemsRef.current.find((item) => item.id === id); if (removed) releaseImage(removed.info); setItems((current) => current.filter((item) => item.id !== id)); clearResult(); }
  function handleDragStart(event: DragStartEvent) { setActiveId(String(event.active.id)); setOverId(String(event.active.id)); }
  function handleDragOver(event: DragOverEvent) { setOverId(event.over ? String(event.over.id) : null); }
  function handleDragEnd(event: DragEndEvent) { if (event.over) setItems((current) => moveItem(current, String(event.active.id), String(event.over?.id))); setActiveId(null); setOverId(null); clearResult(); }

  async function generate() {
    if (!items.length || busy) return; const snapshot = items.slice(); const snapshotSettings = { ...settings }; setBusy(true); setError(""); clearResult(); setStatus("Creating PDF locally...");
    const controller = new AbortController(); abortRef.current = controller;
    try {
      const { jsPDF } = await import("jspdf"); const margin = snapshotSettings.marginMode === "custom" ? snapshotSettings.marginMm * 72 / 25.4 : 0;
      if (margin < 0) throw new Error("Custom margins must be nonnegative."); let pdf: InstanceType<typeof jsPDF> | null = null;
      for (const [index, item] of snapshot.entries()) {
        if (controller.signal.aborted) throw new DOMException("PDF creation cancelled", "AbortError"); setStatus(`Adding page ${index + 1} of ${snapshot.length}...`);
        const image = await orientedImage(item); const pxToPt = 72 / 96; const imageWidth = image.width * pxToPt; const imageHeight = image.height * pxToPt; let pageWidth = imageWidth + margin * 2; let pageHeight = imageHeight + margin * 2;
        if (snapshotSettings.pageSize !== "fit") { const paper = snapshotSettings.pageSize === "a4" ? [595.28, 841.89] : [612, 792]; const landscape = snapshotSettings.orientation === "landscape" || (snapshotSettings.orientation === "auto" && imageWidth > imageHeight); pageWidth = landscape ? paper[1] : paper[0]; pageHeight = landscape ? paper[0] : paper[1]; if (pageWidth - margin * 2 <= 0 || pageHeight - margin * 2 <= 0) throw new Error("Custom margins must leave a positive usable page area."); }
        if (pageWidth > 14400 || pageHeight > 14400) throw new Error("This image would create a PDF page larger than the supported PDF limit."); if (!pdf) pdf = new jsPDF({ unit: "pt", format: [pageWidth, pageHeight], compress: true }); else pdf.addPage([pageWidth, pageHeight]);
        const contentWidth = pageWidth - margin * 2; const contentHeight = pageHeight - margin * 2; const scale = Math.min(contentWidth / imageWidth, contentHeight / imageHeight); const drawWidth = imageWidth * scale; const drawHeight = imageHeight * scale;
        pdf.addImage(image.dataUrl, image.format, margin + (contentWidth - drawWidth) / 2, margin + (contentHeight - drawHeight) / 2, drawWidth, drawHeight, undefined, image.format === "JPEG" ? "NONE" : undefined);
      }
      if (!pdf) throw new Error("Choose at least one image."); if (controller.signal.aborted) throw new DOMException("PDF creation cancelled", "AbortError"); const blob = pdf.output("blob"); const firstImage = snapshot[0]; const firstWidth = firstImage.info.width * 72 / 96; const firstHeight = firstImage.info.height * 72 / 96; const previewRatio = snapshotSettings.pageSize === "fit" ? (firstWidth + margin * 2) / (firstHeight + margin * 2) : (snapshotSettings.orientation === "landscape" || (snapshotSettings.orientation === "auto" && firstWidth > firstHeight) ? (snapshotSettings.pageSize === "a4" ? 841.89 / 595.28 : 792 / 612) : (snapshotSettings.pageSize === "a4" ? 595.28 / 841.89 : 612 / 792)); setResult({ blob, url: URL.createObjectURL(blob), pages: snapshot.length, previewUrl: firstImage.info.url, previewRatio }); setStatus("");
    } catch (generationError) { if (generationError instanceof DOMException && generationError.name === "AbortError") setStatus("PDF creation cancelled."); else setError(generationError instanceof Error ? generationError.message : "The PDF could not be created."); } finally { setBusy(false); abortRef.current = null; }
  }

  const marginError = settings.marginMode === "custom" && (!Number.isFinite(settings.marginMm) || settings.marginMm < 0 || (settings.pageSize !== "fit" && (settings.pageSize === "a4" ? 297 : 279.4) - settings.marginMm * 2 <= 0)) ? "Enter a nonnegative margin that leaves usable page space." : "";
  return <ToolLayout active="images-pdf"><section className="intro"><h1>Convert Images to PDF</h1><p className="intro-copy">Arrange your images and create a PDF, one image per page.</p></section><div className="tool-grid"><section className="tool-panel" aria-labelledby={result ? "pdf-result-heading" : "pdf-heading"}>{result ? <div className="success-state"><h2 className="success-heading" id="pdf-result-heading" ref={headingRef} tabIndex={-1}>Your PDF is ready</h2><p className="success-confirmation"><strong>{result.pages} pages</strong> <span aria-hidden="true">·</span> {formatBytes(result.blob.size)}</p><a className="primary-button success-download" href={result.url} download="filekind-images.pdf">Download PDF</a><div className="success-secondary-actions"><button className="secondary-button" type="button" onClick={() => { clearResult(); setError(""); setStatus("Images ready to arrange."); }}>Adjust settings</button><button className="secondary-button" type="button" onClick={() => { itemsRef.current.forEach((item) => releaseImage(item.info)); setItems([]); clearResult(); setError(""); setStatus(""); }}>Choose another set</button></div></div> : <><div className="panel-heading"><div><h2 id="pdf-heading">Select images</h2><p className="small-note">JPEG, PNG, or static WebP, up to 25 MB each</p></div></div>{items.length === 0 ? <label className="dropzone" htmlFor="pdf-images-file"><span className="upload-icon" aria-hidden="true">+</span><strong>Choose images or drop them here</strong><span>JPEG, PNG, or static WebP, up to 25 MB each</span><input className="file-input" id="pdf-images-file" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} disabled={busy} /></label> : <><DndContext sensors={sensors} collisionDetection={closestCenter} accessibility={{ announcements }} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} onDragCancel={() => { setActiveId(null); setOverId(null); }} autoScroll><SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}><div className="image-list" aria-label="Images in PDF order">{items.map((item, index) => <SortableImageRow key={item.id} item={item} index={index} onRemove={() => removeAt(item.id)} disabled={busy} activeId={activeId} overId={overId} />)}</div></SortableContext></DndContext><label className="secondary-button add-more" htmlFor="pdf-images-file">Add more images<input className="file-input" id="pdf-images-file" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} disabled={busy} /></label></>}{items.length > 0 && <details className="page-settings"><summary>Page settings</summary><div className="settings-fields"><label><span className="field-label">Page size</span><select className="select-input" value={settings.pageSize} onChange={(event) => changeSettings({ pageSize: event.target.value as PageSize })} disabled={busy}><option value="fit">Fit each image</option><option value="a4">A4</option><option value="letter">US Letter</option></select></label><label><span className="field-label">Margins</span><select className="select-input" value={settings.marginMode} onChange={(event) => changeSettings({ marginMode: event.target.value as Settings["marginMode"] })} disabled={busy}><option value="none">None</option><option value="custom">Custom</option></select></label>{settings.marginMode === "custom" && <label><span className="field-label">Custom margin (mm)</span><input className="text-input" type="number" min="0" step="0.1" value={settings.marginMm} onChange={(event) => changeSettings({ marginMm: Number(event.target.value) })} disabled={busy} aria-invalid={Boolean(marginError)} />{marginError && <span className="field-error">{marginError}</span>}</label>}{settings.pageSize !== "fit" && <label><span className="field-label">Orientation</span><select className="select-input" value={settings.orientation} onChange={(event) => changeSettings({ orientation: event.target.value as Settings["orientation"] })} disabled={busy}><option value="auto">Auto per image</option><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select></label>}</div><p className="control-note">Fixed paper sizes fit and centre each image without cropping or stretching. White space can remain when proportions differ, even with zero margins. Fit each image maps 96 CSS pixels to 72 PDF points.</p></details>}{status && <p className="status" role="status" aria-live="polite">{status}</p>}{error && <p className="message error" role="alert">{error}</p>}{items.length > 0 && <div className="generation-actions"><button className="primary-button" type="button" onClick={() => void generate()} disabled={busy || Boolean(marginError)}>{busy ? "Creating PDF..." : "Create PDF"}</button>{busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()}>Cancel</button>}</div>}</>}</section></div></ToolLayout>;
}