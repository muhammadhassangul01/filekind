"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout from "./tool-layout";
import { formatBytes } from "./image-utils";
import { ToolFaq, splitPdfFaqs, splitPdfHowTo } from "./tool-faqs";
import { PDF_LIMITS, buildPagePdfs, buildPdfWithPages, downloadBytes, parsePageRanges, pdfFileRejection, readPdfBytes, readablePdfError, renderPagePreviews, type PagePreview } from "./pdf-ops";
import type { Faq } from "@/lib/content/types";
import type { Crumb } from "@/lib/seo";

export type SplitPdfProps = { seo?: React.ReactNode; panelFaq?: Faq; breadcrumbs?: Crumb[] };

type Mode = "single" | "each";

export default function SplitPdf({ seo, panelFaq, breadcrumbs }: SplitPdfProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<PagePreview[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [range, setRange] = useState("");
  const [rangeError, setRangeError] = useState("");
  const [mode, setMode] = useState<Mode>("single");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const previewsRef = useRef<PagePreview[]>([]);

  useEffect(() => { previewsRef.current = previews; }, [previews]);
  useEffect(() => () => { abortRef.current?.abort(); }, []);
  useEffect(() => { if (busy && headingRef.current) headingRef.current.focus({ preventScroll: true }); }, [busy]);

  function reset() {
    setFile(null);
    setPreviews([]);
    setSelected([]);
    setRange("");
    setRangeError("");
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
      if (!pages.length) throw new Error("This PDF has no pages to split.");
      setFile(nextFile);
      setPreviews(pages);
      setSelected(pages.map((page) => page.page));
      setStatus(`${pages.length} page${pages.length === 1 ? "" : "s"} loaded. All pages are selected.`);
    } catch (loadError) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") setStatus("Loading cancelled.");
      else setError(loadError instanceof Error ? loadError.message : readablePdfError(loadError));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function applyRange() {
    if (!previews.length) return;
    try {
      const pages = parsePageRanges(range, previews.length);
      setSelected(pages);
      setRangeError("");
      setStatus(`${pages.length} page${pages.length === 1 ? "" : "s"} selected.`);
    } catch (rangeFailure) {
      setRangeError(rangeFailure instanceof Error ? rangeFailure.message : "That selection could not be read.");
      setStatus("");
    }
  }

  function toggle(page: number) {
    setSelected((current) => (current.includes(page) ? current.filter((value) => value !== page) : [...current, page].sort((a, b) => a - b)));
    setRangeError("");
  }

  async function generate() {
    if (!file || !selected.length || busy) return;
    setBusy(true);
    setError("");
    setStatus(mode === "single" ? "Building the new PDF..." : "Building one PDF per page...");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const bytes = await readPdfBytes(file);
      if (mode === "single") {
        const output = await buildPdfWithPages(bytes, selected, controller.signal);
        downloadBytes(output, "filekind-pages.pdf");
        setStatus(`${selected.length} page${selected.length === 1 ? "" : "s"} saved to filekind-pages.pdf (${formatBytes(output.length)}).`);
      } else {
        const files = await buildPagePdfs(bytes, selected, controller.signal);
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        for (const entry of files) {
          const copy = new Uint8Array(entry.bytes.length);
          copy.set(entry.bytes);
          zip.file(entry.name, copy);
        }
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "filekind-pages.zip";
        link.rel = "noopener";
        document.body.appendChild(link);
        link.click();
        window.setTimeout(() => { link.remove(); URL.revokeObjectURL(url); }, 10_000);
        setStatus(`${files.length} single-page PDFs saved as filekind-pages.zip (${formatBytes(blob.size)}).`);
      }
    } catch (splitError) {
      if (splitError instanceof DOMException && splitError.name === "AbortError") setStatus("Split cancelled.");
      else setError(splitError instanceof Error ? splitError.message : "The PDF could not be split.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const pageCount = previews.length;

  return (
    <ToolLayout active="split-pdf" breadcrumbs={breadcrumbs}>
      <section className="intro">
        <h1>Split a PDF into the pages you need</h1>
        <p className="intro-copy">Preview every page, keep the ones you want, and save them as one new PDF or as single-page files. Everything runs on your device.</p>
      </section>
      <div className="tool-grid">
        <section className="tool-panel" aria-labelledby="split-heading">
          <div className="panel-heading">
            <div>
              <h2 id="split-heading" ref={headingRef} tabIndex={-1}>{pageCount ? `${pageCount} page${pageCount === 1 ? "" : "s"}` : "Choose a PDF"}</h2>
              <p className="small-note">Up to {formatBytes(PDF_LIMITS.inputBytes)} and {PDF_LIMITS.pages} pages</p>
            </div>
          </div>

          {!pageCount ? (
            <label className="dropzone" htmlFor="split-pdf-file">
              <span className="upload-icon" aria-hidden="true">+</span>
              <strong>{file ? file.name : "Choose a PDF"}</strong>
              <span>{file ? formatBytes(file.size) : "PDF pages stay on this device"}</span>
              <input className="file-input" id="split-pdf-file" type="file" accept="application/pdf,.pdf" onChange={(event) => { const next = event.target.files?.[0]; if (next) void chooseFile(next); event.target.value = ""; }} disabled={busy} />
            </label>
          ) : (
            <>
              <div className="selection-bar">
                <span className="small-note">{selected.length} of {pageCount} pages selected</span>
                <div className="selection-actions">
                  <button className="secondary-button" type="button" onClick={() => { setSelected(previews.map((page) => page.page)); setRange(""); }}>All</button>
                  <button className="secondary-button" type="button" onClick={() => { setSelected([]); }}>None</button>
                </div>
              </div>

              <div className="range-row">
                <label className="field-label" htmlFor="split-range">Page range</label>
                <div className="size-row">
                  <input className="text-input" id="split-range" type="text" inputMode="numeric" placeholder="1-3, 5, 8-10" value={range} onChange={(event) => setRange(event.target.value)} disabled={busy} />
                  <button className="secondary-button" type="button" onClick={applyRange} disabled={busy}>Apply</button>
                </div>
                {rangeError && <span className="field-error" role="alert">{rangeError}</span>}
              </div>

              <div className="page-thumbnails">
                {previews.map((page) => {
                  const isSelected = selected.includes(page.page);
                  return (
                    <button
                      key={page.page}
                      type="button"
                      className={`page-thumbnail page-select${isSelected ? " is-selected" : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => toggle(page.page)}
                      disabled={busy}
                    >
                      <img src={page.url} alt={`Preview of page ${page.page}`} />
                      <strong>Page {page.page}</strong>
                      <span className="select-state">{isSelected ? "Selected" : "Not selected"}</span>
                    </button>
                  );
                })}
              </div>

              <fieldset className="mode-fieldset">
                <legend className="field-label">Save as</legend>
                <label className="radio-row">
                  <input type="radio" name="split-mode" checked={mode === "single"} onChange={() => setMode("single")} disabled={busy} />
                  One PDF with the {selected.length || "selected"} selected page{selected.length === 1 ? "" : "s"}
                </label>
                <label className="radio-row">
                  <input type="radio" name="split-mode" checked={mode === "each"} onChange={() => setMode("each")} disabled={busy} />
                  One PDF per page, downloaded as a ZIP
                </label>
              </fieldset>

              <div className="generation-actions">
                <button className="primary-button" type="button" onClick={generate} disabled={busy || !selected.length}>{busy ? "Working..." : mode === "single" ? "Save selected pages" : "Save each page"}</button>
                <button className="secondary-button" type="button" onClick={reset} disabled={busy}>Cancel</button>
              </div>
            </>
          )}
          {status && <p className="status" role="status" aria-live="polite">{status}</p>}
          {error && <p className="message error" role="alert">{error}</p>}
        </section>
      </div>
      <section className="info-panel">
        <h2>Pages keep their original content</h2>
        <p>Selected pages are copied out of the source document, so fonts, links, and images stay exactly as they were. Password-protected PDFs are not supported.</p>
      </section>
      {seo}
      <ToolFaq faqs={splitPdfFaqs} howTo={splitPdfHowTo} extraFaqs={panelFaq ? [panelFaq] : undefined} />
    </ToolLayout>
  );
}
