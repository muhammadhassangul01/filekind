"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { FileDrop } from "./tool-layout";
import { decodeImage, formatBytes, formatDimensions, releaseImage, validateInput, type ImageInfo } from "./image-utils";
import type { ExtraToolMode } from "@/lib/extra-tools";

type Props = { mode: ExtraToolMode; title: string; introCopy: string };

function renderImage(source: ImageInfo, mode: ExtraToolMode, watermark: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = source.image;
    const square = mode === "square-crop";
    const size = square ? Math.min(source.width, source.height) : undefined;
    const width = square ? size! : (mode === "rotate" ? source.height : source.width);
    const height = square ? size! : (mode === "rotate" ? source.width : source.height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) { reject(new Error("Your browser could not prepare this image.")); return; }
    context.save();
    if (mode === "rotate") {
      context.translate(width / 2, height / 2);
      context.rotate(Math.PI / 2);
      context.drawImage(image, -source.width / 2, -source.height / 2);
    } else if (mode === "flip") {
      context.translate(width, 0);
      context.scale(-1, 1);
      context.drawImage(image, 0, 0);
    } else if (square) {
      context.drawImage(image, (size! - source.width) / 2, (size! - source.height) / 2);
    } else {
      context.drawImage(image, 0, 0);
    }
    context.restore();
    if (mode === "blur") {
      context.clearRect(0, 0, width, height);
      context.filter = "blur(7px)";
      context.drawImage(image, 0, 0, width, height);
      context.filter = "none";
    }
    if (mode === "grayscale" || mode === "sepia" || mode === "invert" || mode === "blur" || mode === "pixelate") {
      const pixels = context.getImageData(0, 0, width, height);
      const data = pixels.data;
      for (let index = 0; index < data.length; index += 4) {
        if (mode === "grayscale") {
          const value = 0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2];
          data[index] = value; data[index + 1] = value; data[index + 2] = value;
        } else if (mode === "sepia") {
          const red = data[index], green = data[index + 1], blue = data[index + 2];
          data[index] = Math.min(255, red * .393 + green * .769 + blue * .189);
          data[index + 1] = Math.min(255, red * .349 + green * .686 + blue * .168);
          data[index + 2] = Math.min(255, red * .272 + green * .534 + blue * .131);
        } else if (mode === "invert") {
          data[index] = 255 - data[index]; data[index + 1] = 255 - data[index + 1]; data[index + 2] = 255 - data[index + 2];
        } else if (mode === "blur") {
          continue;
        } else {
          const block = 10;
          const x = Math.floor((index / 4 % width) / block) * block;
          const y = Math.floor((index / 4 / width) / block) * block;
          const sourceIndex = (y * width + x) * 4;
          data[index] = data[sourceIndex]; data[index + 1] = data[sourceIndex + 1]; data[index + 2] = data[sourceIndex + 2];
        }
      }
      context.putImageData(pixels, 0, 0);
    }
    if (mode === "watermark") {
      context.fillStyle = "rgba(255,255,255,.72)";
      context.font = `${Math.max(18, Math.round(width / 22))}px sans-serif`;
      context.textAlign = "right";
      context.fillText(watermark || "Filekind", width - 24, height - 24);
    }
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Your browser could not create the result.")), mode === "webp" ? "image/webp" : "image/png");
  });
}

export default function ImageUtility({ mode, title, introCopy }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; width: number; height: number } | null>(null);
  const [watermark, setWatermark] = useState("Filekind");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputId = `utility-${mode}`;
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => releaseImage(source), [source]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);
  useEffect(() => { if (result) resultRef.current?.focus({ preventScroll: true }); }, [result]);

  async function chooseFile(nextFile: File) {
    setError(""); setResult(null); setFile(null); setSource(null);
    const validationError = validateInput(nextFile, ["image/jpeg", "image/png", "image/webp"]);
    if (validationError) { setError(validationError); return; }
    try { const info = await decodeImage(nextFile); setFile(nextFile); setSource(info); }
    catch (value) { setError(value instanceof Error ? value.message : "This image could not be decoded."); }
  }

  async function apply() {
    if (!source || !file || busy) return;
    setBusy(true); setError("");
    try {
      const blob = await renderImage(source, mode, watermark);
      setResult({ blob, url: URL.createObjectURL(blob), width: mode === "rotate" ? source.height : mode === "square-crop" ? Math.min(source.width, source.height) : source.width, height: mode === "rotate" ? source.width : mode === "square-crop" ? Math.min(source.width, source.height) : source.height });
    } catch (value) { setError(value instanceof Error ? value.message : "The image could not be processed."); }
    finally { setBusy(false); }
  }

  return <ToolLayout active="info">
    <section className="intro"><p className="eyebrow">Image utility</p><h1>{title}</h1><p className="intro-copy">{introCopy}</p></section>
    <section className="tool-panel utility-panel" aria-labelledby="utility-heading">
      {result ? <div className="success-state">
        <h2 className="success-heading" id="utility-heading" ref={resultRef} tabIndex={-1}>Your image is ready</h2>
        <p className="success-confirmation">{formatDimensions(result.width, result.height)} · {formatBytes(result.blob.size)}</p>
        <a className="primary-button success-download" href={result.url} download={`${file?.name.replace(/\.[^.]+$/, "") || "image"}-filekind.png`}>Download result</a>
        <div className="success-preview"><img src={result.url} alt="Processed image preview" /></div>
        <button className="secondary-button" type="button" onClick={() => setResult(null)}>Adjust and try again</button>
      </div> : <>
        <div className="panel-heading"><div><h2 id="utility-heading">Choose an image</h2><p className="small-note">JPG, PNG, or WebP · up to 2,000,000 px per side</p></div></div>
        {source && file ? <div className="selected-file"><img src={source.url} alt={`Preview of ${file.name}`} /><div className="selected-file-details"><strong>{file.name}</strong><span>{formatBytes(file.size)} · {formatDimensions(source.width, source.height)}</span></div></div> : <FileDrop inputId={inputId} accept="image/jpeg,image/png,image/webp" onFile={chooseFile} busy={busy} />}
        {mode === "watermark" && <label className="field-label utility-option" htmlFor="watermark-text">Watermark text<input className="text-input" id="watermark-text" value={watermark} onChange={(event) => setWatermark(event.target.value)} maxLength={60} /></label>}
        <button className="primary-button" type="button" onClick={apply} disabled={!source || busy}>{busy ? "Processing..." : "Apply and preview"}</button>
        {error && <p className="message error" role="alert">{error}</p>}
      </>}
    </section>
    <section className="info-panel seo-content utility-seo" aria-labelledby="utility-guide">
      <h2 id="utility-guide">Edit an image privately</h2>
      <p>Choose an image, apply the {title.toLowerCase()} effect, preview the result, and download it. Processing happens locally in your browser.</p>
    </section>
  </ToolLayout>;
}
