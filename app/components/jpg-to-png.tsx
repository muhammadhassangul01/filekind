"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { FileDrop, PageFooter } from "./tool-layout";
import { decodeImage, formatBytes, formatDimensions, jpegToPng, releaseImage, validateInput, type ImageInfo } from "./image-utils";

type Result = { blob: Blob; url: string; width: number; height: number };

export default function JpgToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => () => { releaseImage(source); }, [source]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => () => { abortRef.current?.abort(); }, []);
  useEffect(() => { if (actionRef.current) actionRef.current.disabled = busy || !file; }, [busy, file]);
  useEffect(() => {
    if (!result || busy || !headingRef.current) return;
    const heading = headingRef.current;
    heading.focus({ preventScroll: true });
    const bounds = heading.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight) heading.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [result, busy]);

  async function chooseFile(nextFile: File) {
    abortRef.current?.abort(); setBusy(false); setError(""); setStatus(""); setResult(null); setSource(null); setFile(null);
    const validationError = validateInput(nextFile, ["image/jpeg"]);
    if (validationError) { setError("Choose a JPEG image file."); return; }
    try { const info = await decodeImage(nextFile); setFile(nextFile); setSource(info); setStatus("Image ready to convert."); }
    catch (decodeError) { setError(decodeError instanceof Error ? decodeError.message : "This image could not be decoded."); }
  }

  async function convert() {
    if (busy) return;
    if (!file) { setError("Choose a JPEG first."); return; }
    setBusy(true); setError(""); setStatus("Converting locally..."); setResult(null);
    const controller = new AbortController(); abortRef.current = controller;
    try { const output = await jpegToPng(file, controller.signal); setResult({ ...output, url: URL.createObjectURL(output.blob) }); setStatus(""); }
    catch (conversionError) { if (conversionError instanceof DOMException && conversionError.name === "AbortError") setStatus("Conversion cancelled."); else setError(conversionError instanceof Error ? conversionError.message : "Conversion failed. Try a different image."); }
    finally { setBusy(false); abortRef.current = null; }
  }

  function resetResult() { setResult(null); setError(""); setStatus("Image ready to convert."); }
  function chooseAnother() { abortRef.current?.abort(); setResult(null); setSource(null); setFile(null); setBusy(false); setError(""); setStatus(""); }

  return <ToolLayout active="converter">
    <section className="intro"><h1>Convert JPG to PNG</h1><p className="intro-copy">Create a PNG privately in your browser without changing the image dimensions.</p></section>
    <div className="tool-grid"><section className="tool-panel" aria-labelledby={result ? "jpg-result-heading" : "jpg-heading"}>{result ? <div className="success-state"><h2 className="success-heading" id="jpg-result-heading" ref={headingRef} tabIndex={-1}>Your image is ready</h2><p className="success-confirmation">PNG output: <strong>{formatBytes(result.blob.size)}</strong>.</p><a className="primary-button success-download" href={result.url} download={`${file?.name.replace(/\.(jpe?g)$/i, "") || "image"}.png`}>Download PNG</a><div className="success-preview"><img src={result.url} alt="Preview of the converted PNG" /></div><dl className="stats success-stats"><div className="stat"><dt>Original size</dt><dd>{file ? formatBytes(file.size) : "-"}</dd></div><div className="stat"><dt>Output size</dt><dd>{formatBytes(result.blob.size)}</dd></div><div className="stat"><dt>Dimensions</dt><dd>{formatDimensions(result.width, result.height)}</dd></div></dl><div className="success-secondary-actions"><button className="secondary-button" type="button" onClick={resetResult}>Adjust settings</button><button className="secondary-button" type="button" onClick={chooseAnother}>Choose another image</button></div></div> : <><div className="panel-heading"><div><h2 id="jpg-heading">Choose a JPEG</h2><p className="small-note">JPEG in, PNG out</p></div></div>{source && file ? <div className="selected-file"><img src={source.url} alt={`Preview of ${file.name}`} /><div className="selected-file-details"><strong title={file.name} aria-label={`Selected file: ${file.name}`}>{file.name}</strong><span>{formatBytes(file.size)} · {formatDimensions(source.width, source.height)}</span></div><label className="change-image" htmlFor="jpg-file">Change image<input className="file-input" id="jpg-file" type="file" accept="image/jpeg" onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) void chooseFile(nextFile); event.target.value = ""; }} disabled={busy} /></label></div> : <FileDrop inputId="jpg-file" accept="image/jpeg" onFile={chooseFile} busy={busy} />}<p className="control-note">PNG preserves the image content without JPEG compression artifacts.</p><button ref={actionRef} className="primary-button" type="button" onClick={convert} suppressHydrationWarning disabled={busy || !file} style={{ marginTop: 16 }}>{busy ? "Converting..." : "Convert to PNG"}</button>{busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()} style={{ marginTop: 8, width: "100%" }}>Cancel</button>}<p className="status" role="status" aria-live="polite">{status}</p>{error && <p className="message error" role="alert">{error}</p>}</>}</section></div>
    <PageFooter />
  </ToolLayout>;
}