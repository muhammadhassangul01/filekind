"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ToolLayout, { FileDrop, PageFooter } from "./tool-layout";
import { CompressSeoContent } from "./seo-content";
import { compressToTarget, formatBytes, formatDimensions, releaseImage, validateInput, decodeImage, type CompressionMetrics, type ImageInfo } from "./image-utils";

type Result = { blob: Blob; url: string; width: number; height: number };
const now = () => performance.now();

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [target, setTarget] = useState(() => {
    if (typeof window === "undefined") return "500";
    const value = new URLSearchParams(window.location.search).get("targetKB");
    const numericValue = Number(value);
    return value && /^\d+(?:\.\d+)?$/.test(value) && numericValue >= 1 && numericValue <= 50_000 ? value : "500";
  });
  const [unit, setUnit] = useState("KB");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const selectionJobRef = useRef(0);
  const workerRef = useRef<Worker | null>(null);
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => () => { releaseImage(source); }, [source]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => () => { abortRef.current?.abort(); workerRef.current?.terminate(); }, []);
  useEffect(() => {
    if (actionRef.current) actionRef.current.disabled = busy || !file;
  }, [busy, file]);

  useEffect(() => {
    if (!result || busy || !resultHeadingRef.current) return;
    const heading = resultHeadingRef.current;
    heading.focus({ preventScroll: true });
    const bounds = heading.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      heading.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }, [result, busy]);

  function clearResult() {
    setResult(null);
  }

  function updateTarget(value: string) {
    clearResult();
    setTarget(value);
  }

  function updateUnit(value: string) {
    clearResult();
    setUnit(value);
  }

  async function chooseFile(nextFile: File) {
    const selectionJob = ++selectionJobRef.current;
    const selectionStarted = now();
    abortRef.current?.abort();
    setBusy(false); setError(""); setStatus(""); clearResult(); setSource(null); setFile(null);
    const validationError = validateInput(nextFile, ["image/jpeg", "image/png"]);
    if (validationError) { setError(validationError); return; }
    try {
      const info = await decodeImage(nextFile);
      if (selectionJob !== selectionJobRef.current) { releaseImage(info); return; }
      console.info("[Filekind compression] selection", { selectionToReadyMs: now() - selectionStarted, decodeCount: 1, decodeTimeMs: now() - selectionStarted, width: info.width, height: info.height });
      setFile(nextFile); setSource(info); setStatus("Image ready to compress.");
    } catch (decodeError) { setError(decodeError instanceof Error ? decodeError.message : "This image could not be decoded."); }
  }

  async function compress() {
    if (busy) return;
    if (!file) { setError("Choose an image first."); return; }
    const numericTarget = Number(target) * (unit === "MB" ? 1_000_000 : 1_000);
    if (!Number.isFinite(numericTarget) || numericTarget < 1_000 || numericTarget > 50_000_000) { setError("Enter a target between 1 KB and 50 MB."); return; }
    setBusy(true); setError(""); setStatus("Compressing locally..."); clearResult();
    const controller = new AbortController(); abortRef.current = controller;
    const jobId = crypto.randomUUID();
    const generateStarted = now();
    try {
      const output = await compressFile(file, numericTarget, controller.signal, source, jobId);
      if (output.blob.size > numericTarget) throw new Error("The output missed the target by a small amount. Try a larger target.");
      console.info("[Filekind compression]", { generateTimeMs: now() - generateStarted, totalDecodeCount: 1 + output.metrics.decodeCount, ...output.metrics, outputBytes: output.blob.size, outputWidth: output.width, outputHeight: output.height });
      setResult({ ...output, url: URL.createObjectURL(output.blob) });
      setStatus("");
    } catch (compressionError) {
      if (compressionError instanceof DOMException && compressionError.name === "AbortError") setStatus("Compression cancelled.");
      else setError(compressionError instanceof Error ? compressionError.message : "Compression failed. Try a different image.");
    } finally { setBusy(false); abortRef.current = null; }
  }

  function cancel() { abortRef.current?.abort(); }

  async function compressFile(nextFile: File, targetBytes: number, signal: AbortSignal, selectedInfo: ImageInfo | null, jobId: string) {
    const workerSupported = typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined" && typeof createImageBitmap === "function";
    if (!workerSupported) return compressToTarget(nextFile, targetBytes, signal, selectedInfo ?? undefined);
    const worker = new Worker("/image-compressor.worker.js");
    workerRef.current = worker;
    try {
      const output = await new Promise<{ blob: Blob; width: number; height: number; metrics: CompressionMetrics }>((resolve, reject) => {
        const cleanup = () => { worker.onmessage = null; worker.onerror = null; signal.removeEventListener("abort", abort); };
        const abort = () => { worker.postMessage({ type: "cancel", jobId }); worker.terminate(); reject(new DOMException("Compression cancelled", "AbortError")); };
        worker.onmessage = (event) => {
          if (event.data?.jobId !== jobId) return;
          cleanup();
          if (event.data.type === "error") reject(Object.assign(new Error(event.data.message), { name: event.data.name }));
          else resolve({ blob: new Blob([event.data.blob], { type: "image/jpeg" }), width: event.data.width, height: event.data.height, metrics: event.data.metrics });
        };
        worker.onerror = () => { cleanup(); reject(new Error("Worker image compression failed.")); };
        signal.addEventListener("abort", abort, { once: true });
        worker.postMessage({ type: "compress", file: nextFile, targetBytes, jobId });
      });
      return output;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") throw error;
      if (error instanceof Error && error.message === "Worker image compression is not supported.") return compressToTarget(nextFile, targetBytes, signal, selectedInfo ?? undefined);
      throw error;
    } finally {
      worker.terminate();
      workerRef.current = null;
    }
  }

  function adjustSettings() {
    clearResult();
    setError("");
    setStatus("Image ready to compress.");
  }

  function chooseAnotherImage() {
    selectionJobRef.current += 1;
    abortRef.current?.abort();
    workerRef.current?.terminate();
    clearResult();
    setSource(null);
    setFile(null);
    setBusy(false);
    setError("");
    setStatus("");
  }
  const targetBytes = Number(target) * (unit === "MB" ? 1_000_000 : 1_000);

  return <ToolLayout active="compressor">
    <section className="intro"><h1>Compress Image to KB or MB</h1><p className="intro-copy">Set a maximum size and create a lighter JPEG privately in your browser.</p></section>
    <div className="tool-grid">
      <section className="tool-panel" aria-labelledby={result ? "compress-result-heading" : "compress-heading"}>
        {result ? <div className="success-state">
          <h2 className="success-heading" id="compress-result-heading" ref={resultHeadingRef} tabIndex={-1}>Your image is ready</h2>
          <p className="success-confirmation">Output: <strong>{formatBytes(result.blob.size)}</strong>, at or below your {formatBytes(targetBytes)} target.</p>
          <a className="primary-button success-download" href={result.url} download={`${file?.name.replace(/\.[^.]+$/, "") || "image"}-compressed.jpg`}>Download JPEG</a>
          <div className="success-preview"><img src={result.url} alt="Preview of the compressed JPEG" /></div>
          <dl className="stats success-stats"><div className="stat"><dt>Original size</dt><dd>{file ? formatBytes(file.size) : "-"}</dd></div><div className="stat"><dt>Output size</dt><dd>{formatBytes(result.blob.size)}</dd></div><div className="stat"><dt>Original dimensions</dt><dd>{source ? formatDimensions(source.width, source.height) : "-"}</dd></div><div className="stat"><dt>Output dimensions</dt><dd>{formatDimensions(result.width, result.height)}</dd></div></dl>
          <div className="success-secondary-actions"><button className="secondary-button" type="button" onClick={adjustSettings}>Adjust settings</button><button className="secondary-button" type="button" onClick={chooseAnotherImage}>Choose another image</button></div>
        </div> : <>
        <div className="panel-heading"><div><h2 id="compress-heading">Choose an image</h2><p className="small-note">JPEG or PNG, up to 25 MB</p></div></div>
        {source && file ? <div className="selected-file"><img src={source.url} alt={`Preview of ${file.name}`} /><div className="selected-file-details"><strong title={file.name} aria-label={`Selected file: ${file.name}`}>{file.name}</strong><span>{formatBytes(file.size)} · {formatDimensions(source.width, source.height)}</span></div><label className="change-image" htmlFor="compress-file">Change image<input className="file-input" id="compress-file" type="file" accept="image/jpeg,image/png" onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) void chooseFile(nextFile); event.target.value = ""; }} disabled={busy} /></label></div> : <FileDrop inputId="compress-file" accept="image/jpeg,image/png" onFile={chooseFile} busy={busy} />}
        <div className="controls">
          <div className="target-field"><label className="field-label" htmlFor="target-size">Maximum file size</label><div className="size-row"><input className="text-input" id="target-size" type="number" min="1" value={target} onChange={(event) => updateTarget(event.target.value)} suppressHydrationWarning /><select className="select-input" value={unit} onChange={(event) => updateUnit(event.target.value)} aria-label="Target size unit"><option>KB</option><option>MB</option></select></div><div className="presets" aria-label="Target size presets"><button className={`preset ${target === "100" && unit === "KB" ? "active" : ""}`} type="button" onClick={() => { updateTarget("100"); updateUnit("KB"); }}>100 KB</button><button className={`preset ${target === "200" && unit === "KB" ? "active" : ""}`} type="button" onClick={() => { updateTarget("200"); updateUnit("KB"); }}>200 KB</button><button className={`preset ${target === "500" && unit === "KB" ? "active" : ""}`} type="button" onClick={() => { updateTarget("500"); updateUnit("KB"); }}>500 KB</button></div></div>
          <div className="action-field"><button ref={actionRef} className="primary-button" type="button" onClick={compress} suppressHydrationWarning disabled={busy || !file}>{busy ? "Compressing..." : "Generate"}</button>{busy && <button className="secondary-button" type="button" onClick={cancel} style={{ marginTop: 8, width: "100%" }}>Cancel</button>}</div>
        </div>
        <p className="control-note">1 KB = 1,000 bytes. Transparency becomes white and dimensions may shrink.</p>
        <p className="status" role="status" aria-live="polite">{status}</p>
        {error && <p className="message error" role="alert">{error}</p>}
        </>}
      </section>
    </div>
    <div className="support-strip"><span><strong>Private</strong> Files stay in your browser.</span><span><strong>Limits</strong> Up to 25 MB, 16,000 px per side, and 48 MP.</span></div>
    <CompressSeoContent /><p className="info-panel preset-link">Start with a <Link href="/compress-image?targetKB=200">200 KB target</Link>; the preset changes the starting value on this page and is not a separate tool.</p><PageFooter />
  </ToolLayout>;
}
