"use client";

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type Announcements, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import ToolLayout from "./tool-layout";
import { formatBytes } from "./image-utils";
import { ToolFaq, mergePdfFaqs, mergePdfHowTo } from "./tool-faqs";
import { PDF_LIMITS, mergePdfFiles, pdfFileRejection, pdfPageCount, readPdfBytes, readablePdfError } from "./pdf-ops";
import type { Faq } from "@/lib/content/types";
import type { Crumb } from "@/lib/seo";

export type MergePdfProps = { seo?: React.ReactNode; panelFaq?: Faq; breadcrumbs?: Crumb[] };

type MergeItem = { id: string; name: string; bytes: Uint8Array; pages: number; size: number };
type Result = { bytes: Uint8Array; pages: number; url: string };

function moveItem(items: MergeItem[], activeId: string, overId: string): MergeItem[] {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return items;
  const next = [...items];
  const [item] = next.splice(oldIndex, 1);
  next.splice(newIndex, 0, item);
  return next;
}

const announcements: Announcements = {
  onDragStart({ active }) { return `Picked up PDF ${Number(active.data.current?.sortable?.index) + 1}. Use arrow keys to move it, Space to drop, or Escape to cancel.`; },
  onDragOver({ over }) { return over ? `PDF moved to position ${Number(over.data.current?.sortable?.index) + 1}.` : "PDF is not over a position."; },
  onDragEnd({ over }) { return over ? `PDF dropped at position ${Number(over.data.current?.sortable?.index) + 1}.` : "PDF dropped."; },
  onDragCancel() { return "PDF movement cancelled."; },
};

function SortableRow({ item, index, onRemove, disabled, activeId, overId }: { item: MergeItem; index: number; onRemove: () => void; disabled: boolean; activeId: string | null; overId: string | null }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, disabled });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`image-list-item${isDragging ? " is-dragging" : ""}${overId === item.id && activeId !== item.id ? " is-drop-target" : ""}`}>
      <button className="drag-handle" type="button" aria-label={`Reorder ${item.name}, currently position ${index + 1}`} {...attributes} {...listeners} disabled={disabled}>
        <span aria-hidden="true" className="drag-dots">{Array.from({ length: 6 }, (_, dot) => <i key={dot} />)}</span>
      </button>
      <span className="file-badge" aria-hidden="true">PDF</span>
      <div className="selected-file-details">
        <strong title={item.name}>{item.name}</strong>
        <span>{item.pages} page{item.pages === 1 ? "" : "s"} · {formatBytes(item.size)}</span>
      </div>
      <button className="remove-button" type="button" onClick={onRemove} disabled={disabled} aria-label={`Remove ${item.name}`}>Remove</button>
    </div>
  );
}

export default function MergePdf({ seo, panelFaq, breadcrumbs }: MergePdfProps) {
  const [items, setItems] = useState<MergeItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const itemsRef = useRef<MergeItem[]>([]);
  const resultRef = useRef<Result | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { resultRef.current = result; }, [result]);
  useEffect(() => () => { if (resultRef.current) URL.revokeObjectURL(resultRef.current.url); }, []);
  useEffect(() => () => { abortRef.current?.abort(); }, []);
  useEffect(() => { if (result && headingRef.current) headingRef.current.focus({ preventScroll: true }); }, [result]);

  function clearResult() {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
    resultRef.current = null;
    setResult(null);
  }

  async function addFiles(files: File[]) {
    setError("");
    setStatus("");
    clearResult();
    const acceptedItems: MergeItem[] = [];
    for (const file of files) {
      const rejection = pdfFileRejection(file);
      if (rejection) { setError(`${file.name}: ${rejection}`); continue; }
      if (itemsRef.current.length + acceptedItems.length >= PDF_LIMITS.files) {
        setError(`This tool takes up to ${PDF_LIMITS.files} PDFs at a time.`);
        break;
      }
      try {
        const bytes = await readPdfBytes(file);
        const pages = await pdfPageCount(bytes);
        const currentPages = [...itemsRef.current, ...acceptedItems].reduce((sum, item) => sum + item.pages, 0);
        if (currentPages + pages > PDF_LIMITS.pages) {
          setError(`Adding ${file.name} would push the merged document past ${PDF_LIMITS.pages} pages.`);
          continue;
        }
        acceptedItems.push({ id: crypto.randomUUID(), name: file.name, bytes, pages, size: file.size });
      } catch (readError) {
        setError(`${file.name}: ${readablePdfError(readError)}`);
      }
    }
    if (acceptedItems.length) {
      setItems((current) => [...current, ...acceptedItems]);
      setStatus(`${acceptedItems.length} PDF${acceptedItems.length === 1 ? "" : "s"} ready to merge.`);
    }
  }

  function removeAt(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    clearResult();
    setStatus("");
  }

  function handleDragStart(event: DragStartEvent) { setActiveId(String(event.active.id)); setOverId(String(event.active.id)); }
  function handleDragOver(event: DragOverEvent) { setOverId(event.over ? String(event.over.id) : null); }
  function handleDragEnd(event: DragEndEvent) {
    if (event.over) setItems((current) => moveItem(current, String(event.active.id), String(event.over?.id)));
    setActiveId(null);
    setOverId(null);
    clearResult();
  }

  async function generate() {
    if (!items.length || busy) return;
    const snapshot = items.slice();
    setBusy(true);
    setError("");
    clearResult();
    setStatus("Combining PDFs locally...");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const merged = await mergePdfFiles(snapshot.map((item) => ({ bytes: item.bytes })), controller.signal);
      if (merged.length >= PDF_LIMITS.outputBytes) throw new Error("The merged PDF would be larger than the 150 MB output limit.");
      const copy = new Uint8Array(merged.length);
      copy.set(merged);
      const blob = new Blob([copy.buffer], { type: "application/pdf" });
      setResult({ bytes: merged, pages: snapshot.reduce((sum, item) => sum + item.pages, 0), url: URL.createObjectURL(blob) });
      setStatus("");
    } catch (mergeError) {
      if (mergeError instanceof DOMException && mergeError.name === "AbortError") setStatus("Merge cancelled.");
      else setError(mergeError instanceof Error ? mergeError.message : "The PDFs could not be merged.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const totalPages = items.reduce((sum, item) => sum + item.pages, 0);

  return (
    <ToolLayout active="merge-pdf" breadcrumbs={breadcrumbs}>
      <section className="intro">
        <h1>Merge PDF files into one document</h1>
        <p className="intro-copy">Add the PDFs, drag them into the order you want, and combine them in your browser. Nothing is uploaded.</p>
      </section>
      <div className="tool-grid">
        <section className="tool-panel" aria-labelledby={result ? "merge-result-heading" : "merge-heading"}>
          {result ? (
            <div className="success-state">
              <h2 className="success-heading" id="merge-result-heading" ref={headingRef} tabIndex={-1}>Your merged PDF is ready</h2>
              <p className="success-confirmation"><strong>{result.pages} pages</strong> <span aria-hidden="true">·</span> {formatBytes(result.bytes.length)}</p>
              <a className="primary-button success-download" href={result.url} download="filekind-merged.pdf">Download PDF</a>
              <div className="success-secondary-actions">
                <button className="secondary-button" type="button" onClick={clearResult}>Merge another set</button>
                <button className="secondary-button" type="button" onClick={() => { setItems([]); clearResult(); setError(""); setStatus(""); }}>Start over</button>
              </div>
            </div>
          ) : (
            <>
              <div className="panel-heading">
                <div>
                  <h2 id="merge-heading">{items.length ? `${items.length} PDF${items.length === 1 ? "" : "s"} in order` : "Choose PDFs"}</h2>
                  <p className="small-note">Up to {PDF_LIMITS.files} files, {PDF_LIMITS.pages} pages combined, {formatBytes(PDF_LIMITS.inputBytes)} each</p>
                </div>
              </div>
              {items.length === 0 ? (
                <label className="dropzone" htmlFor="merge-pdf-file">
                  <span className="upload-icon" aria-hidden="true">+</span>
                  <strong>Choose PDFs or drop them here</strong>
                  <span>Files stay on this device</span>
                  <input className="file-input" id="merge-pdf-file" type="file" accept="application/pdf,.pdf" multiple onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} disabled={busy} />
                </label>
              ) : (
                <>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} accessibility={{ announcements }} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} onDragCancel={() => { setActiveId(null); setOverId(null); }}>
                    <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                      <div className="image-list">
                        {items.map((item, index) => (
                          <SortableRow key={item.id} item={item} index={index} onRemove={() => removeAt(item.id)} disabled={busy} activeId={activeId} overId={overId} />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  <div className="add-more">
                    <label className="secondary-button" htmlFor="merge-more-file">
                      Add more PDFs
                      <input className="file-input" id="merge-more-file" type="file" accept="application/pdf,.pdf" multiple onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} disabled={busy} />
                    </label>
                  </div>
                  <p className="control-note">{items.length} file{items.length === 1 ? "" : "s"}, {totalPages} page{totalPages === 1 ? "" : "s"} total.</p>
                  <div className="generation-actions">
                    <button className="primary-button" type="button" onClick={generate} disabled={busy || items.length < 1}>{busy ? "Merging..." : "Merge PDFs"}</button>
                    {busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()}>Cancel</button>}
                  </div>
                </>
              )}
            </>
          )}
          {status && <p className="status" role="status" aria-live="polite">{status}</p>}
          {error && <p className="message error" role="alert">{error}</p>}
        </section>
      </div>
      <section className="info-panel">
        <h2>Original page quality is kept</h2>
        <p>Pages are copied into a new document instead of being printed again, so text, links, and images arrive exactly as they were. Password-protected and corrupt files are rejected with a clear message.</p>
      </section>
      {seo}
      <ToolFaq faqs={mergePdfFaqs} howTo={mergePdfHowTo} extraFaqs={panelFaq ? [panelFaq] : undefined} />
    </ToolLayout>
  );
}
