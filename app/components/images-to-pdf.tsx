"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { PageFooter } from "./tool-layout";
import { decodeImage, formatBytes, formatDimensions, isAnimatedWebP, releaseImage, validateInput, type ImageInfo } from "./image-utils";

type SelectedImage = { file: File; info: ImageInfo };
type Result = { blob: Blob; url: string; pages: number };
const accepted = ["image/jpeg", "image/png", "image/webp"];

function fileDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(new Error("This image could not be read.")); reader.readAsDataURL(file); });
}

async function webpAsPng(item: SelectedImage): Promise<string> {
  const image = new Image(); image.src = item.info.url; await image.decode();
  const canvas = document.createElement("canvas"); canvas.width = item.info.width; canvas.height = item.info.height;
  const context = canvas.getContext("2d"); if (!context) throw new Error("Your browser could not prepare this image.");
  context.drawImage(image, 0, 0); return canvas.toDataURL("image/png");
}

export default function ImagesToPdf() {
  const [items, setItems] = useState<SelectedImage[]>([]);
  const [orientation, setOrientation] = useState<"p" | "l">("p");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => () => { items.forEach((item) => releaseImage(item.info)); }, [items]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => { if (result && headingRef.current) headingRef.current.focus({ preventScroll: true }); }, [result]);

  async function addFiles(files: File[]) {
    setError(""); setStatus(""); setResult(null);
    const additions: SelectedImage[] = [];
    for (const file of files) {
      const validationError = validateInput(file, accepted);
      if (validationError) { setError(`${file.name}: ${validationError}`); continue; }
      if (await isAnimatedWebP(file)) { setError(`${file.name}: animated WebP files are not supported.`); continue; }
      try { additions.push({ file, info: await decodeImage(file) }); }
      catch (decodeError) { setError(`${file.name}: ${decodeError instanceof Error ? decodeError.message : "This image could not be decoded."}`); }
    }
    if (additions.length) { setItems((current) => [...current, ...additions]); setStatus(`${additions.length} image${additions.length === 1 ? "" : "s"} ready.`); }
  }

  function removeAt(index: number) { setItems((current) => current.filter((_, itemIndex) => itemIndex !== index)); setResult(null); }
  function move(index: number, direction: -1 | 1) { setItems((current) => { const nextIndex = index + direction; if (nextIndex < 0 || nextIndex >= current.length) return current; const next = [...current]; [next[index], next[nextIndex]] = [next[nextIndex], next[index]]; return next; }); setResult(null); }

  async function generate() {
    if (!items.length || busy) return;
    setBusy(true); setError(""); setResult(null); setStatus("Creating PDF locally...");
    const controller = new AbortController(); abortRef.current = controller;
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation, unit: "mm", format: "a4" });
      const pageWidth = orientation === "p" ? 210 : 297;
      const pageHeight = orientation === "p" ? 297 : 210;
      const margin = 16;
      for (const [index, item] of items.entries()) {
        if (controller.signal.aborted) throw new DOMException("PDF creation cancelled", "AbortError");
        if (index > 0) pdf.addPage("a4", orientation);
        setStatus(`Adding page ${index + 1} of ${items.length}...`);
        const dataUrl = item.file.type === "image/webp" ? await webpAsPng(item) : await fileDataUrl(item.file);
        const imageRatio = item.info.width / item.info.height;
        const boxWidth = pageWidth - margin * 2;
        const boxHeight = pageHeight - margin * 2;
        let width = boxWidth;
        let height = width / imageRatio;
        if (height > boxHeight) { height = boxHeight; width = height * imageRatio; }
        pdf.addImage(dataUrl, item.file.type === "image/png" || item.file.type === "image/webp" ? "PNG" : "JPEG", margin + (boxWidth - width) / 2, margin + (boxHeight - height) / 2, width, height);
      }
      const blob = pdf.output("blob");
      setResult({ blob, url: URL.createObjectURL(blob), pages: items.length }); setStatus("");
    } catch (generationError) {
      if (generationError instanceof DOMException && generationError.name === "AbortError") setStatus("PDF creation cancelled.");
      else setError(generationError instanceof Error ? generationError.message : "The PDF could not be created.");
    } finally { setBusy(false); abortRef.current = null; }
  }

  return <ToolLayout active="images-pdf">
    <section className="intro"><h1>Convert Images to PDF</h1><p className="intro-copy">Arrange JPEG, PNG, and static WebP images into a clean A4 PDF, one image per page.</p></section>
    <div className="tool-grid"><section className="tool-panel" aria-labelledby={result ? "pdf-result-heading" : "pdf-heading"}>{result ? <div className="success-state"><h2 className="success-heading" id="pdf-result-heading" ref={headingRef} tabIndex={-1}>Your PDF is ready</h2><p className="success-confirmation"><strong>{result.pages} pages</strong> · {formatBytes(result.blob.size)}</p><a className="primary-button success-download" href={result.url} download="filekind-images.pdf">Download PDF</a><div className="pdf-preview"><iframe title="PDF preview" src={result.url} /></div><div className="success-secondary-actions"><button className="secondary-button" type="button" onClick={() => { setResult(null); setError(""); setStatus("Images ready to arrange."); }}>Adjust settings</button><button className="secondary-button" type="button" onClick={() => { setResult(null); setItems([]); setError(""); setStatus(""); }}>Choose another set</button></div></div> : <><div className="panel-heading"><div><h2 id="pdf-heading">Select images</h2><p className="small-note">JPEG, PNG, or static WebP, up to 25 MB each</p></div></div><label className="dropzone" htmlFor="pdf-images-file"><span className="upload-icon" aria-hidden="true">+</span><strong>Choose images or drop them here</strong><span>JPEG, PNG, or static WebP, up to 25 MB each</span><input className="file-input" id="pdf-images-file" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} disabled={busy} /></label>{items.length > 0 && <div className="image-list" aria-label="Images in PDF order">{items.map((item, index) => <div className="image-list-item" key={`${item.file.name}-${index}`}><span className="thumbnail-number">{index + 1}</span><img src={item.info.url} alt="" /><div className="selected-file-details"><strong title={item.file.name}>{item.file.name}</strong><span>{formatBytes(item.file.size)} · {formatDimensions(item.info.width, item.info.height)}</span></div><div className="item-actions"><button className="secondary-button" type="button" onClick={() => move(index, -1)} disabled={index === 0}>Move up</button><button className="secondary-button" type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}>Move down</button><button className="secondary-button" type="button" onClick={() => removeAt(index)}>Remove</button></div></div>)}</div>}<label className="secondary-button add-more" htmlFor="pdf-add-more">Add more images<input className="file-input" id="pdf-add-more" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} /></label><fieldset className="orientation"><legend className="field-label">Page orientation</legend><label><input type="radio" name="orientation" checked={orientation === "p"} onChange={() => setOrientation("p")} /> Portrait</label><label><input type="radio" name="orientation" checked={orientation === "l"} onChange={() => setOrientation("l")} /> Landscape</label></fieldset><button className="primary-button" type="button" onClick={generate} disabled={busy || !items.length}>{busy ? "Generating..." : "Generate PDF"}</button>{busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()} style={{ marginTop: 8, width: "100%" }}>Cancel</button>}<p className="status" role="status" aria-live="polite">{status}</p>{error && <p className="message error" role="alert">{error}</p>}</>}</section></div><PageFooter />
  </ToolLayout>;
}
