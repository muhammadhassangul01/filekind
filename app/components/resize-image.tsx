"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { FileDrop } from "./tool-layout";
import { ResizeSeoContent, resizePanelFaq } from "./seo-content";
import { ToolFaq, resizeFaqs, resizeHowTo } from "./tool-faqs";
import {
  MAX_DIMENSION,
  MAX_PIXELS,
  decodeImage,
  formatBytes,
  formatDimensions,
  isAnimatedWebP,
  releaseImage,
  resizeImage,
  validateInput,
  type ImageInfo,
} from "./image-utils";

type Result = { blob: Blob; url: string; width: number; height: number };
const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImageInfo | null>(null);
  const [mode, setMode] = useState<"percent" | "pixels">("percent");
  const [percent, setPercent] = useState("50");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState<"jpg" | "png">("jpg");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const ratio = source && source.height > 0 ? source.width / source.height : 1;

  useEffect(() => () => releaseImage(source), [source]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    if (!result || busy || !headingRef.current) return;
    headingRef.current.focus({ preventScroll: true });
    const bounds = headingRef.current.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
      headingRef.current.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  }, [result, busy]);

  function targetSize(): { width: number; height: number } | null {
    if (!source) return null;
    if (mode === "percent") {
      if (!/^\d+(?:\.\d+)?$/.test(percent)) return null;
      const value = Number(percent);
      if (value < 1 || value > 800) return null;
      return {
        width: Math.max(1, Math.round((source.width * value) / 100)),
        height: Math.max(1, Math.round((source.height * value) / 100)),
      };
    }
    const parsedWidth = Number(width);
    const parsedHeight = Number(height);
    if (!Number.isInteger(parsedWidth) || !Number.isInteger(parsedHeight)) return null;
    if (parsedWidth < 1 || parsedHeight < 1) return null;
    return { width: parsedWidth, height: parsedHeight };
  }

  const previewSize = targetSize();

  function resetResult() {
    setResult(null);
  }

  function onWidthChange(value: string) {
    resetResult();
    setWidth(value);
    const parsed = Number(value);
    if (lock && source && Number.isFinite(parsed) && parsed > 0) setHeight(String(Math.max(1, Math.round(parsed / ratio))));
  }

  function onHeightChange(value: string) {
    resetResult();
    setHeight(value);
    const parsed = Number(value);
    if (lock && source && Number.isFinite(parsed) && parsed > 0) setWidth(String(Math.max(1, Math.round(parsed * ratio))));
  }

  async function chooseFile(nextFile: File) {
    abortRef.current?.abort();
    setBusy(false);
    setError("");
    setStatus("");
    setResult(null);
    setSource(null);
    setFile(null);
    const validationError = validateInput(nextFile, supportedTypes);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (await isAnimatedWebP(nextFile)) {
      setError("Animated WebP files are not supported. Choose a static WebP image.");
      return;
    }
    try {
      const info = await decodeImage(nextFile);
      setFile(nextFile);
      setSource(info);
      setWidth(String(info.width));
      setHeight(String(info.height));
      setMode("percent");
      setPercent("50");
      setStatus("Image ready to resize.");
    } catch (decodeError) {
      setError(decodeError instanceof Error ? decodeError.message : "This image could not be decoded.");
    }
  }

  async function generate() {
    if (busy || !file) return;
    const target = targetSize();
    if (!target) {
      setError(
        mode === "percent"
          ? "Enter a scale between 1 and 800 percent."
          : "Enter a whole number of pixels of at least 1 for both width and height.",
      );
      return;
    }
    if (target.width > MAX_DIMENSION || target.height > MAX_DIMENSION) {
      setError(`Each side is limited to ${MAX_DIMENSION.toLocaleString()} pixels. Choose a smaller size.`);
      return;
    }
    if (target.width * target.height > MAX_PIXELS) {
      setError(`Output is limited to ${MAX_PIXELS / 1_000_000} megapixels. Choose a smaller size.`);
      return;
    }
    setBusy(true);
    setError("");
    setStatus("Resizing locally...");
    setResult(null);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const output = await resizeImage(file, { ...target, format, quality }, controller.signal);
      setResult({ ...output, url: URL.createObjectURL(output.blob) });
      setStatus("");
    } catch (resizeError) {
      if (resizeError instanceof DOMException && resizeError.name === "AbortError") setStatus("Resize cancelled.");
      else setError(resizeError instanceof Error ? resizeError.message : "Resizing failed. Try a different size.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function chooseAnother() {
    abortRef.current?.abort();
    setResult(null);
    setSource(null);
    setFile(null);
    setBusy(false);
    setError("");
    setStatus("");
  }

  const sizeChange =
    result && file ? Math.round((1 - result.blob.size / file.size) * 100) : 0;
  const isUpscale = Boolean(
    source && previewSize && (previewSize.width > source.width || previewSize.height > source.height),
  );

  return (
    <ToolLayout active="resize">
      <section className="intro">
        <h1>Resize Image Online Free</h1>
        <p className="intro-copy">
          Change image dimensions by percentage or exact pixels in your browser. Keep the aspect ratio, choose JPG or
          PNG output, and never upload your file.
        </p>
      </section>
      <div className="tool-grid">
        <section className="tool-panel" aria-labelledby={result ? "resize-result-heading" : "resize-heading"}>
          {result ? (
            <div className="success-state">
              <h2 className="success-heading" id="resize-result-heading" ref={headingRef} tabIndex={-1}>
                Your resized image is ready
              </h2>
              <p className="success-confirmation">
                <strong>{formatDimensions(result.width, result.height)}</strong> · {formatBytes(result.blob.size)}
                {file && sizeChange !== 0 ? ` (${sizeChange > 0 ? "-" : "+"}${Math.abs(sizeChange)}%)` : ""}.
              </p>
              <a
                className="primary-button success-download"
                href={result.url}
                download={`${file?.name.replace(/\.[^.]+$/, "") || "image"}-resized.${format}`}
              >
                Download {format === "jpg" ? "JPEG" : "PNG"}
              </a>
              <div className="success-preview">
                <img src={result.url} alt={`Preview of the resized image at ${formatDimensions(result.width, result.height)}`} />
              </div>
              <dl className="stats success-stats">
                <div className="stat"><dt>Original dimensions</dt><dd>{source ? formatDimensions(source.width, source.height) : "-"}</dd></div>
                <div className="stat"><dt>New dimensions</dt><dd>{formatDimensions(result.width, result.height)}</dd></div>
                <div className="stat"><dt>Original size</dt><dd>{file ? formatBytes(file.size) : "-"}</dd></div>
                <div className="stat"><dt>Output size</dt><dd>{formatBytes(result.blob.size)}</dd></div>
              </dl>
              <p className="control-note">
                {result.width * result.height < (source?.width ?? 0) * (source?.height ?? 0)
                  ? "Downscaling reduces both dimensions and file size."
                  : "Enlarging adds pixels but not detail, so the picture will not get sharper."}
              </p>
              <div className="success-secondary-actions">
                <button className="secondary-button" type="button" onClick={() => { setResult(null); setError(""); setStatus("Image ready to resize."); }}>Adjust settings</button>
                <button className="secondary-button" type="button" onClick={chooseAnother}>Choose another image</button>
              </div>
            </div>
          ) : (
            <>
              <div className="panel-heading">
                <div>
                  <h2 id="resize-heading">Choose an image</h2>
                  <p className="small-note">JPEG, PNG, or static WebP, up to 25 MB</p>
                </div>
              </div>
              {source && file ? (
                <div className="selected-file">
                  <img src={source.url} alt={`Preview of ${file.name}`} />
                  <div className="selected-file-details">
                    <strong title={file.name} aria-label={`Selected file: ${file.name}`}>{file.name}</strong>
                    <span>{formatBytes(file.size)} · {formatDimensions(source.width, source.height)}</span>
                  </div>
                  <label className="change-image" htmlFor="resize-file">
                    Change image
                    <input className="file-input" id="resize-file" type="file" accept={supportedTypes.join(",")} onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) void chooseFile(nextFile); event.target.value = ""; }} disabled={busy} />
                  </label>
                </div>
              ) : (
                <FileDrop inputId="resize-file" accept={supportedTypes.join(",")} onFile={chooseFile} busy={busy} />
              )}

              <div className="controls">
                <div className="target-field">
                  <label className="field-label" htmlFor="resize-mode">Resize by</label>
                  <select className="select-input format-select" id="resize-mode" value={mode} onChange={(event) => { setMode(event.target.value as "percent" | "pixels"); setResult(null); setError(""); }} suppressHydrationWarning>
                    <option value="percent">Percentage</option>
                    <option value="pixels">Exact pixels</option>
                  </select>
                  {mode === "percent" ? (
                    <div className="size-row resize-value-row">
                      <input className="text-input" id="resize-percent" type="number" min={1} max={800} value={percent} onChange={(event) => { resetResult(); setPercent(event.target.value); }} aria-label="Scale percentage" suppressHydrationWarning />
                      <span className="unit-suffix" aria-hidden="true">%</span>
                    </div>
                  ) : (
                    <div className="size-row resize-value-row">
                      <input className="text-input" type="number" min={1} max={MAX_DIMENSION} value={width} onChange={(event) => onWidthChange(event.target.value)} aria-label="Target width in pixels" placeholder="Width" suppressHydrationWarning />
                      <span className="unit-suffix" aria-hidden="true">×</span>
                      <input className="text-input" type="number" min={1} max={MAX_DIMENSION} value={height} onChange={(event) => onHeightChange(event.target.value)} aria-label="Target height in pixels" placeholder="Height" suppressHydrationWarning />
                    </div>
                  )}
                  {mode === "pixels" && (
                    <label className="checkbox-row">
                      <input type="checkbox" checked={lock} onChange={(event) => setLock(event.target.checked)} />
                      Keep aspect ratio
                    </label>
                  )}
                  <p className="small-note resize-preview">
                    {previewSize
                      ? `Output: ${formatDimensions(previewSize.width, previewSize.height)} · ${((previewSize.width * previewSize.height) / 1_000_000).toFixed(1)} MP`
                      : `Enter a size between 1 and ${MAX_DIMENSION.toLocaleString()} pixels.`}
                    {isUpscale ? " Enlarging adds pixels, not detail." : ""}
                  </p>
                </div>
                <div className="action-field">
                  <label className="field-label" htmlFor="resize-format">Output format</label>
                  <select className="select-input format-select" id="resize-format" value={format} onChange={(event) => { setFormat(event.target.value as "jpg" | "png"); setResult(null); }} suppressHydrationWarning>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                  </select>
                  {format === "jpg" && (
                    <div className="quality-field">
                      <label className="field-label" htmlFor="resize-quality">JPG quality: {quality}</label>
                      <input className="range-input" id="resize-quality" type="range" min={40} max={100} step={1} value={quality} onChange={(event) => { setQuality(Number(event.target.value)); resetResult(); }} />
                    </div>
                  )}
                  <button className="primary-button resize-generate" type="button" onClick={generate} disabled={busy || !file}>
                    {busy ? "Resizing..." : "Resize image"}
                  </button>
                  {busy && (
                    <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()} style={{ marginTop: 8, width: "100%" }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <p className="control-note">
                Scaling happens in your browser with smoothing enabled, so edges stay clean when you reduce size. PNG
                output is lossless; JPG output uses the quality setting above.
              </p>
              <p className="status" role="status" aria-live="polite">{status}</p>
              {error && <p className="message error" role="alert">{error}</p>}
            </>
          )}
        </section>
      </div>
      <div className="support-strip">
        <span><strong>Private</strong> Files stay in your browser.</span>
        <span><strong>Limits</strong> Up to {MAX_DIMENSION.toLocaleString()} px per side and {MAX_PIXELS / 1_000_000} MP.</span>
      </div>
      <ResizeSeoContent />
      <ToolFaq faqs={resizeFaqs} howTo={resizeHowTo} extraFaqs={[resizePanelFaq]} />
    </ToolLayout>
  );
}
