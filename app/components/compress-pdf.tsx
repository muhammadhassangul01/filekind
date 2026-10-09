"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout from "./tool-layout";
import { formatBytes } from "./image-utils";
import { ToolFaq, compressPdfFaqs, compressPdfHowTo } from "./tool-faqs";
import { COMPRESSION_LEVELS, compressPdf, type CompressionLevel } from "./pdf-compress";
import { PDF_LIMITS, pdfFileRejection, pdfPageCount, readPdfBytes, readablePdfError } from "./pdf-ops";
import type { Faq } from "@/lib/content/types";
import type { Crumb } from "@/lib/seo";

export type CompressPdfProps = { seo?: React.ReactNode; panelFaq?: Faq; breadcrumbs?: Crumb[] };

type Result = { url: string; before: number; after: number; pages: number; rebuilt: number; level: CompressionLevel };

export default function CompressPdf({ seo, panelFaq, breadcrumbs }: CompressPdfProps) {
  const [file, setFile] = useState<File | null>(null);
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const resultRef = useRef<Result | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => { resultRef.current = result; }, [result]);
  useEffect(() => () => { if (resultRef.current) URL.revokeObjectURL(resultRef.current.url); }, []);
  useEffect(() => () => { abortRef.current?.abort(); }, []);
  useEffect(() => { if (result && headingRef.current) headingRef.current.focus({ preventScroll: true }); }, [result]);

  function clearResult() {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
    resultRef.current = null;
    setResult(null);
  }

  async function chooseFile(nextFile: File) {
    const rejection = pdfFileRejection(nextFile);
    if (rejection) { setError(rejection); return; }
    setError("");
    clearResult();
    setStatus("Reading the PDF locally...");
    try {
      const source = await readPdfBytes(nextFile);
      const pages = await pdfPageCount(source);
      if (pages > PDF_LIMITS.pages) throw new Error(`This PDF has ${pages} pages. The limit is ${PDF_LIMITS.pages}.`);
      setFile(nextFile);
      setBytes(source);
      setPageCount(pages);
      setStatus(`${nextFile.name} is ready · ${pages} page${pages === 1 ? "" : "s"}.`);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : readablePdfError(loadError));
      setStatus("");
    }
  }

  async function generate() {
    if (!bytes || busy) return;
    setBusy(true);
    setError("");
    clearResult();
    setStatus("Opening PDF locally...");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const outcome = await compressPdf(bytes, level, {
        signal: controller.signal,
        onProgress: (message) => setStatus(message),
      });
      if (outcome.after >= outcome.before) {
        const hint = level === "strong" ? "The pictures are already smaller than this tool can rebuild them." : `Try the ${level === "light" ? "Medium" : "Strong"} level for a smaller result.`;
        throw new Error(`This PDF is already as small as this tool can make it at the ${settings.label} level. ${hint}`);
      }
      const copy = new Uint8Array(outcome.bytes.length);
      copy.set(outcome.bytes);
      const blob = new Blob([copy.buffer], { type: "application/pdf" });
      setResult({
        url: URL.createObjectURL(blob),
        before: outcome.before,
        after: outcome.after,
        pages: pageCount,
        rebuilt: outcome.rebuilt,
        level,
      });
      setStatus("");
    } catch (compressError) {
      if (compressError instanceof DOMException && compressError.name === "AbortError") setStatus("Compression cancelled.");
      else setError(compressError instanceof Error ? compressError.message : "The PDF could not be compressed.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const settings = COMPRESSION_LEVELS[level];
  const saved = result ? result.before - result.after : 0;
  const percent = result && result.before ? Math.round((saved / result.before) * 100) : 0;

  return (
    <ToolLayout active="compress-pdf" breadcrumbs={breadcrumbs}>
      <section className="intro">
        <h1>Compress a PDF to a smaller file</h1>
        <p className="intro-copy">Pick how far to push the images inside your PDF. Text stays selectable and links keep working, because only the pictures are rebuilt.</p>
      </section>
      <div className="tool-grid">
        <section className="tool-panel" aria-labelledby={result ? "compress-result-heading" : "compress-heading"}>
          {result ? (
            <div className="success-state">
              <h2 className="success-heading" id="compress-result-heading" ref={headingRef} tabIndex={-1}>Your smaller PDF is ready</h2>
              <p className="success-confirmation">
                <strong>{formatBytes(result.before)} → {formatBytes(result.after)}</strong> <span aria-hidden="true">·</span> {percent}% smaller · {result.rebuilt} image{result.rebuilt === 1 ? "" : "s"} rebuilt
              </p>
              <a className="primary-button success-download" href={result.url} download="filekind-compressed.pdf">Download PDF</a>
              <div className="success-secondary-actions">
                <button className="secondary-button" type="button" onClick={clearResult}>Try another level</button>
                <button className="secondary-button" type="button" onClick={() => { setFile(null); clearResult(); setError(""); setStatus(""); }}>Choose another PDF</button>
              </div>
            </div>
          ) : (
            <>
              <div className="panel-heading">
                <div>
                  <h2 id="compress-heading">Choose a PDF</h2>
                  <p className="small-note">Up to {formatBytes(PDF_LIMITS.inputBytes)} and {PDF_LIMITS.pages} pages</p>
                </div>
              </div>
              <label className="dropzone" htmlFor="compress-pdf-file">
                <span className="upload-icon" aria-hidden="true">+</span>
                <strong>{file ? file.name : "Choose a PDF or drop it here"}</strong>
                <span>{file ? formatBytes(file.size) : "The file stays on this device"}</span>
                <input className="file-input" id="compress-pdf-file" type="file" accept="application/pdf,.pdf" onChange={(event) => { const next = event.target.files?.[0]; if (next) chooseFile(next); event.target.value = ""; }} disabled={busy} />
              </label>

              <div className="quality-field">
                <span className="field-label" id="level-label">Compression level</span>
                <div className="presets" role="radiogroup" aria-labelledby="level-label">
                  {(Object.keys(COMPRESSION_LEVELS) as CompressionLevel[]).map((key) => (
                    <button key={key} type="button" className={`preset${level === key ? " active" : ""}`} aria-pressed={level === key} onClick={() => { setLevel(key); clearResult(); }} disabled={busy}>
                      {COMPRESSION_LEVELS[key].label}
                    </button>
                  ))}
                </div>
                <p className="control-note">{settings.note}</p>
              </div>

              <div className="generation-actions">
                <button className="primary-button" type="button" onClick={generate} disabled={busy || !bytes}>{busy ? "Compressing..." : "Compress PDF"}</button>
                {busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()}>Cancel</button>}
              </div>
            </>
          )}
          {status && <p className="status" role="status" aria-live="polite">{status}</p>}
          {error && <p className="message error" role="alert">{error}</p>}
        </section>
      </div>
      <section className="info-panel">
        <h2>What compression changes here</h2>
        <p>Image-heavy PDFs get smaller because the embedded photos are re-encoded at the level you choose, and the strong level also rebuilds large images at a smaller size. Text, links, and page order are never rasterised, so copy and selection still work.</p>
      </section>
      {seo}
      <ToolFaq faqs={compressPdfFaqs} howTo={compressPdfHowTo} extraFaqs={panelFaq ? [panelFaq] : undefined} />
    </ToolLayout>
  );
}
