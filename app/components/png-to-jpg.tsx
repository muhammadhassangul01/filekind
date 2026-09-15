"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { FileDrop, PageFooter } from "./tool-layout";
import { decodeImage, formatDimensions, formatBytes, pngToJpeg, releaseImage, validateInput, type ImageInfo } from "./image-utils";

type Result = { blob: Blob; url: string; width: number; height: number };

export default function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => () => { releaseImage(source); }, [source]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => () => { abortRef.current?.abort(); }, []);
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

  async function chooseFile(nextFile: File) {
    abortRef.current?.abort(); setBusy(false); setError(""); setResult(null); setSource(null); setFile(null);
    const validationError = validateInput(nextFile, ["image/png"]);
    if (validationError) { setError(validationError.replace("JPEG or PNG", "PNG")); return; }
    try { const info = await decodeImage(nextFile); setFile(nextFile); setSource(info); setStatus("Image ready to convert."); }
    catch (decodeError) { setError(decodeError instanceof Error ? decodeError.message : "This image could not be decoded."); }
  }

  async function convert() {
    if (busy) return;
    if (!file) { setError("Choose a PNG first."); return; }
    setBusy(true); setError(""); setResult(null); setStatus("Converting locally...");
    const controller = new AbortController(); abortRef.current = controller;
    try { const output = await pngToJpeg(file, controller.signal); setResult({ ...output, url: URL.createObjectURL(output.blob) }); setStatus(""); }
    catch (conversionError) { if (conversionError instanceof DOMException && conversionError.name === "AbortError") setStatus("Conversion cancelled."); else setError(conversionError instanceof Error ? conversionError.message : "Conversion failed. Try a different PNG."); }
    finally { setBusy(false); abortRef.current = null; }
  }

  function adjustSettings() {
    setResult(null);
    setError("");
    setStatus("Image ready to convert.");
  }

  function chooseAnotherImage() {
    abortRef.current?.abort();
    setResult(null);
    setSource(null);
    setFile(null);
    setBusy(false);
    setError("");
    setStatus("");
  }

  return <ToolLayout active="converter">
    <section className="intro"><h1>Convert PNG to JPG</h1><p className="intro-copy">Create a compatible JPG privately in your browser. Transparent areas become white.</p></section>
    <div className="tool-grid">
      <section className="tool-panel" aria-labelledby={result ? "png-result-heading" : "png-heading"}>{result ? <div className="success-state"><h2 className="success-heading" id="png-result-heading" ref={resultHeadingRef} tabIndex={-1}>Your image is ready</h2><p className="success-confirmation">JPG output: <strong>{formatBytes(result.blob.size)}</strong>.</p><a className="primary-button success-download" href={result.url} download={`${file?.name.replace(/\.png$/i, "") || "image"}.jpg`}>Download JPEG</a><div className="success-preview"><img src={result.url} alt="Preview of the converted JPEG" /></div><dl className="stats success-stats"><div className="stat"><dt>Original size</dt><dd>{file ? formatBytes(file.size) : "-"}</dd></div><div className="stat"><dt>Output size</dt><dd>{formatBytes(result.blob.size)}</dd></div><div className="stat"><dt>Original dimensions</dt><dd>{source ? formatDimensions(source.width, source.height) : "-"}</dd></div><div className="stat"><dt>Output dimensions</dt><dd>{formatDimensions(result.width, result.height)}</dd></div></dl><div className="success-secondary-actions"><button className="secondary-button" type="button" onClick={adjustSettings}>Adjust settings</button><button className="secondary-button" type="button" onClick={chooseAnotherImage}>Choose another image</button></div></div> : <><div className="panel-heading"><div><h2 id="png-heading">Choose a PNG</h2><p className="small-note">PNG in, JPG out</p></div></div>{source && file ? <div className="selected-file"><img src={source.url} alt={`Preview of ${file.name}`} /><div className="selected-file-details"><strong title={file.name} aria-label={`Selected file: ${file.name}`}>{file.name}</strong><span>{formatBytes(file.size)} · {formatDimensions(source.width, source.height)}</span></div><label className="change-image" htmlFor="png-file">Change image<input className="file-input" id="png-file" type="file" accept="image/png" onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) void chooseFile(nextFile); event.target.value = ""; }} disabled={busy} /></label></div> : <FileDrop inputId="png-file" accept="image/png" onFile={chooseFile} busy={busy} />}<p className="control-note">Transparent areas become white because JPG does not support transparency.</p><button ref={actionRef} className="primary-button" type="button" onClick={convert} suppressHydrationWarning disabled={busy || !file} style={{ marginTop: 16 }}>{busy ? "Converting..." : "Convert to JPG"}</button>{busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()} style={{ marginTop: 8, width: "100%" }}>Cancel</button>}<p className="status" role="status" aria-live="polite">{status}</p>{error && <p className="message error" role="alert">{error}</p>}</>}</section>
    </div><PageFooter />
  </ToolLayout>;
}
