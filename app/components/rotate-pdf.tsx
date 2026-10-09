"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout from "./tool-layout";
import { formatBytes } from "./image-utils";
import { ToolFaq, rotatePdfFaqs, rotatePdfHowTo } from "./tool-faqs";
import { PDF_LIMITS, downloadBytes, pdfFileRejection, readPdfBytes, readablePdfError, renderPagePreviews, rotatePdfBytes, type PagePreview } from "./pdf-ops";
import type { Faq } from "@/lib/content/types";
import type { Crumb } from "@/lib/seo";

export type RotatePdfProps = { seo?: React.ReactNode; panelFaq?: Faq; breadcrumbs?: Crumb[] };

export default function RotatePdf({ seo, panelFaq, breadcrumbs }: RotatePdfProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<PagePreview[]>([]);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => () => { abortRef.current?.abort(); }, []);
  useEffect(() => { if (busy && headingRef.current) headingRef.current.focus({ preventScroll: true }); }, [busy]);

  function reset() {
    setFile(null);
    setPreviews([]);
    setRotations({});
    setError("");
    setStatus("");
  }

  async function chooseFile(nextFile: File) {
    const rejection = pdfFileRejection(nextFile);
    if (rejection) { setError(rejection); return; }
    setBusy(true);
    setError("");
    setStatus("Reading pages locally...");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const bytes = await readPdfBytes(nextFile);
      const pages = await renderPagePreviews(bytes, { signal: controller.signal, targetWidth: 220 });
      if (!pages.length) throw new Error("This PDF has no pages to rotate.");
      setFile(nextFile);
      setPreviews(pages);
      setRotations({});
      setStatus(`${pages.length} page${pages.length === 1 ? "" : "s"} loaded.`);
    } catch (loadError) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") setStatus("Loading cancelled.");
      else setError(loadError instanceof Error ? loadError.message : readablePdfError(loadError));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function turn(page: number, delta: number) {
    setRotations((current) => ({ ...current, [page]: (current[page] ?? 0) + delta }));
  }

  function turnAll(delta: number) {
    setRotations((current) => {
      const next: Record<number, number> = { ...current };
      for (const page of previews) next[page.page] = (next[page.page] ?? 0) + delta;
      return next;
    });
  }

  async function generate() {
    if (!file || busy) return;
    const entries = Object.entries(rotations).filter(([, delta]) => ((delta % 360) + 360) % 360 !== 0);
    if (!entries.length) {
      setError("Turn at least one page before saving.");
      return;
    }
    setBusy(true);
    setError("");
    setStatus("Applying rotation...");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const bytes = await readPdfBytes(file);
      const deltas = new Map(entries.map(([page, delta]) => [Number(page), delta]));
      const output = await rotatePdfBytes(bytes, deltas, controller.signal);
      downloadBytes(output, "filekind-rotated.pdf");
      setStatus(`Rotation saved · ${formatBytes(output.length)} · ${entries.length} page${entries.length === 1 ? "" : "s"} turned.`);
    } catch (rotateError) {
      if (rotateError instanceof DOMException && rotateError.name === "AbortError") setStatus("Rotation cancelled.");
      else setError(rotateError instanceof Error ? rotateError.message : "The PDF could not be rotated.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const changedPages = Object.values(rotations).filter((delta) => ((delta % 360) + 360) % 360 !== 0).length;

  return (
    <ToolLayout active="rotate-pdf" breadcrumbs={breadcrumbs}>
      <section className="intro">
        <h1>Rotate PDF pages the way you want to read them</h1>
        <p className="intro-copy">Turn single pages or the whole document left or right, preview the angle, and save a new PDF with the original quality intact.</p>
      </section>
      <div className="tool-grid">
        <section className="tool-panel" aria-labelledby="rotate-heading">
          <div className="panel-heading">
            <div>
              <h2 id="rotate-heading" ref={headingRef} tabIndex={-1}>{previews.length ? `${previews.length} page${previews.length === 1 ? "" : "s"}` : "Choose a PDF"}</h2>
              <p className="small-note">Up to {formatBytes(PDF_LIMITS.inputBytes)} and {PDF_LIMITS.pages} pages</p>
            </div>
          </div>

          {!previews.length ? (
            <label className="dropzone" htmlFor="rotate-pdf-file">
              <span className="upload-icon" aria-hidden="true">+</span>
              <strong>{file ? file.name : "Choose a PDF or drop it here"}</strong>
              <span>{file ? formatBytes(file.size) : "The file stays on this device"}</span>
              <input className="file-input" id="rotate-pdf-file" type="file" accept="application/pdf,.pdf" onChange={(event) => { const next = event.target.files?.[0]; if (next) void chooseFile(next); event.target.value = ""; }} disabled={busy} />
            </label>
          ) : (
            <>
              <div className="selection-bar">
                <span className="small-note">{changedPages} page{changedPages === 1 ? "" : "s"} turned</span>
                <div className="selection-actions">
                  <button className="secondary-button" type="button" onClick={() => turnAll(-90)} disabled={busy}>Rotate all left</button>
                  <button className="secondary-button" type="button" onClick={() => turnAll(90)} disabled={busy}>Rotate all right</button>
                  <button className="secondary-button" type="button" onClick={() => setRotations({})} disabled={busy}>Reset</button>
                </div>
              </div>

              <div className="page-thumbnails">
                {previews.map((page) => {
                  const delta = ((rotations[page.page] ?? 0) % 360 + 360) % 360;
                  const quarter = delta === 90 || delta === 270;
                  return (
                    <article className="page-thumbnail" key={page.page}>
                      <div className="thumb-frame">
                        <img
                          src={page.url}
                          alt={`Preview of page ${page.page}`}
                          style={{ transform: `rotate(${delta}deg)${quarter ? " scale(.7)" : delta === 180 ? " scale(1)" : ""}` }}
                        />
                      </div>
                      <strong>Page {page.page}{delta ? ` · ${delta}°` : ""}</strong>
                      <div className="thumb-actions">
                        <button className="secondary-button" type="button" onClick={() => turn(page.page, -90)} disabled={busy} aria-label={`Rotate page ${page.page} left`}>Left</button>
                        <button className="secondary-button" type="button" onClick={() => turn(page.page, 90)} disabled={busy} aria-label={`Rotate page ${page.page} right`}>Right</button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="generation-actions">
                <button className="primary-button" type="button" onClick={generate} disabled={busy || !changedPages}>{busy ? "Saving..." : "Save rotated PDF"}</button>
                <button className="secondary-button" type="button" onClick={reset} disabled={busy}>Cancel</button>
              </div>
            </>
          )}
          {status && <p className="status" role="status" aria-live="polite">{status}</p>}
          {error && <p className="message error" role="alert">{error}</p>}
        </section>
      </div>
      <section className="info-panel">
        <h2>Rotation does not touch the content</h2>
        <p>Only the page display angle is changed, so text, images, links, and page order are copied exactly as they were. Pages already turned in the source file keep that angle and add yours to it.</p>
      </section>
      {seo}
      <ToolFaq faqs={rotatePdfFaqs} howTo={rotatePdfHowTo} extraFaqs={panelFaq ? [panelFaq] : undefined} />
    </ToolLayout>
  );
}
