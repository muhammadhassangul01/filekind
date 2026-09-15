"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { FileDrop, PageFooter } from "./tool-layout";
import { convertImage, decodeImage, detectImageFormat, formatBytes, formatDimensions, formatLabel, imageMimeTypes, isAnimatedWebP, releaseImage, validateInput, type ImageFormat, type ImageInfo } from "./image-utils";

type Result = { blob: Blob; url: string; width: number; height: number; format: ImageFormat };
const formats: ImageFormat[] = ["jpg", "png", "webp"];

function presetFormat(value: string | null): ImageFormat | null {
  return formats.includes(value as ImageFormat) ? value as ImageFormat : null;
}

export default function ImageConverter({ from, to }: { from?: string; to?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImageInfo | null>(null);
  const [inputFormat, setInputFormat] = useState<ImageFormat | null>(() => presetFormat(from ?? (typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("from"))));
  const [outputFormat, setOutputFormat] = useState<ImageFormat>(() => presetFormat(to ?? (typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("to"))) ?? "png");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => () => releaseImage(source), [source]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    if (!result || busy || !headingRef.current) return;
    headingRef.current.focus({ preventScroll: true });
    const bounds = headingRef.current.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight) headingRef.current.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [result, busy]);

  async function chooseFile(nextFile: File) {
    abortRef.current?.abort();
    setBusy(false); setError(""); setStatus(""); setResult(null); setSource(null); setFile(null);
    const format = detectImageFormat(nextFile);
    if (!format || !["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) { setError("Choose a JPEG, PNG, or static WebP image. Animated images are not supported."); return; }
    const validationError = validateInput(nextFile, ["image/jpeg", "image/png", "image/webp"]);
    if (validationError) { setError(validationError); return; }
    if (await isAnimatedWebP(nextFile)) { setError("Animated WebP files are not supported. Choose a static WebP image."); return; }
    try {
      const info = await decodeImage(nextFile);
      setFile(nextFile); setSource(info); setInputFormat(format); setStatus("Image ready to convert.");
    } catch (decodeError) { setError(decodeError instanceof Error ? decodeError.message : "This image could not be decoded. Animated images are not supported."); }
  }

  async function convert() {
    if (busy) return;
    if (!file || !inputFormat) { setError("Choose a JPEG, PNG, or static WebP image first."); return; }
    if (inputFormat === outputFormat) { setError(`This image is already ${formatLabel(outputFormat)}. Choose a different output format.`); return; }
    setBusy(true); setError(""); setResult(null); setStatus("Converting locally...");
    const controller = new AbortController(); abortRef.current = controller;
    try {
      const output = await convertImage(file, outputFormat, controller.signal);
      if (output.blob.type !== imageMimeTypes[outputFormat]) throw new Error("The browser returned an unexpected file format.");
      setResult({ ...output, url: URL.createObjectURL(output.blob), format: outputFormat }); setStatus("");
    } catch (conversionError) {
      if (conversionError instanceof DOMException && conversionError.name === "AbortError") setStatus("Conversion cancelled.");
      else setError(conversionError instanceof Error ? conversionError.message : "Conversion failed. Try a different image.");
    } finally { setBusy(false); abortRef.current = null; }
  }

  function chooseAnother() { abortRef.current?.abort(); setResult(null); setSource(null); setFile(null); setInputFormat(null); setBusy(false); setError(""); setStatus(""); }

  return <ToolLayout active="converter">
    <section className="intro"><h1>Convert JPG, PNG and WebP images</h1><p className="intro-copy">Convert supported image formats privately in your browser, including JPG to PNG and WebP to JPG.</p></section>
    <div className="tool-grid"><section className="tool-panel" aria-labelledby={result ? "convert-result-heading" : "convert-heading"}>{result ? <div className="success-state">
      <h2 className="success-heading" id="convert-result-heading" ref={headingRef} tabIndex={-1}>Your image is ready</h2><p className="success-confirmation">{formatLabel(result.format)} output: <strong>{formatBytes(result.blob.size)}</strong>.</p>
      <a className="primary-button success-download" href={result.url} download={`${file?.name.replace(/\.[^.]+$/, "") || "image"}.${result.format}`}>Download {formatLabel(result.format)}</a>
      <div className="success-preview"><img src={result.url} alt={`Preview of the converted ${formatLabel(result.format)}`} /></div>
      <dl className="stats success-stats"><div className="stat"><dt>Original file</dt><dd>{file ? formatBytes(file.size) : "-"}</dd></div><div className="stat"><dt>Output format</dt><dd>{formatLabel(result.format)}</dd></div><div className="stat"><dt>Dimensions</dt><dd>{formatDimensions(result.width, result.height)}</dd></div></dl>
      <p className="control-note">JPG removes transparency. Converting to PNG cannot restore quality already lost in a JPEG.</p><div className="success-secondary-actions"><button className="secondary-button" type="button" onClick={() => { setResult(null); setError(""); setStatus("Image ready to convert."); }}>Adjust settings</button><button className="secondary-button" type="button" onClick={chooseAnother}>Choose another image</button></div>
    </div> : <>
      <div className="panel-heading"><div><h2 id="convert-heading">Choose one image</h2><p className="small-note">JPEG, PNG, or static WebP, up to 25 MB</p></div></div>
      {source && file ? <div className="selected-file"><img src={source.url} alt={`Preview of ${file.name}`} /><div className="selected-file-details"><strong title={file.name} aria-label={`Selected file: ${file.name}`}>{file.name}</strong><span>{formatLabel(inputFormat ?? "png")} · {formatBytes(file.size)} · {formatDimensions(source.width, source.height)}</span></div><label className="change-image" htmlFor="convert-file">Change image<input className="file-input" id="convert-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) void chooseFile(nextFile); event.target.value = ""; }} disabled={busy} /></label></div> : <FileDrop inputId="convert-file" accept="image/jpeg,image/png,image/webp" onFile={chooseFile} busy={busy} />}
      <div className="controls converter-controls"><div><label className="field-label" htmlFor="output-format">Output format</label><select className="select-input format-select" id="output-format" value={outputFormat} onChange={(event) => { setOutputFormat(event.target.value as ImageFormat); setResult(null); }} suppressHydrationWarning><option value="jpg">JPG</option><option value="png">PNG</option><option value="webp">WebP</option></select></div><div><button className="primary-button" type="button" onClick={convert} disabled={busy || !file}>{busy ? "Converting..." : "Generate"}</button>{busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()} style={{ marginTop: 8, width: "100%" }}>Cancel</button>}</div></div>
      <p className="control-note">Animated files are rejected so animation is never silently dropped. JPG removes transparency.</p><p className="status" role="status" aria-live="polite">{status}</p>{error && <p className="message error" role="alert">{error}</p>}
    </>}</section></div><section className="info-panel"><h2>Supported conversions</h2><p>Use this tool for JPG to PNG, PNG to JPG, JPG to WebP, or WebP to JPG. The selected file determines the input format; the preset URL only sets an initial output choice.</p></section><PageFooter />
  </ToolLayout>;
}
