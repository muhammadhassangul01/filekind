"use client";

import { useEffect, useRef, useState } from "react";
import ToolLayout, { PageFooter } from "./tool-layout";
import { formatBytes } from "./image-utils";

const LIMITS = { inputBytes: 50_000_000, pages: 100, pixels: 120_000_000, outputBytes: 150_000_000 };
type PageImage = { name: string; blob: Blob; url: string; width: number; height: number };

export default function PdfToImages() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"jpg" | "png">("jpg");
  const [pages, setPages] = useState<PageImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => { pages.forEach((page) => URL.revokeObjectURL(page.url)); }, [pages]);
  useEffect(() => () => abortRef.current?.abort(), []);

  function chooseFile(nextFile: File) {
    if (nextFile.type !== "application/pdf") { setError("Choose a PDF file."); return; }
    if (nextFile.size > LIMITS.inputBytes) { setError(`This PDF is larger than the ${formatBytes(LIMITS.inputBytes)} supported limit.`); return; }
    setFile(nextFile); setPages([]); setError(""); setStatus("PDF ready to render.");
  }

  async function generate() {
    if (!file || busy) return;
    setBusy(true); setPages([]); setError(""); setStatus("Opening PDF locally...");
    const controller = new AbortController(); abortRef.current = controller;
    const created: PageImage[] = [];
    let cleanupPdf: (() => void) | null = null;
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
      const bytes = new Uint8Array(await file.arrayBuffer());
      const loadingTask = pdfjs.getDocument({ data: bytes });
      loadingTask.onPassword = (_callback: unknown, reason: number) => { throw new Error(reason === 1 ? "This PDF is password-protected. Password-protected PDFs are not supported in this release." : "This PDF requires a password."); };
      const pdf = await loadingTask.promise;
      cleanupPdf = () => pdf.cleanup();
      if (pdf.numPages > LIMITS.pages) throw new Error(`This PDF has ${pdf.numPages} pages. The limit is ${LIMITS.pages}.`);
      let totalPixels = 0;
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        if (controller.signal.aborted) throw new DOMException("Rendering cancelled", "AbortError");
        setStatus(`Rendering page ${pageNumber} of ${pdf.numPages}...`);
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(2, Math.sqrt(4_000_000 / (baseViewport.width * baseViewport.height)));
        const viewport = page.getViewport({ scale: Math.max(0.5, scale) });
        const pixels = Math.ceil(viewport.width) * Math.ceil(viewport.height);
        totalPixels += pixels;
        if (totalPixels > LIMITS.pixels) throw new Error(`Rendering stopped at the ${formatBytes(LIMITS.pixels)} pixel budget. Choose a shorter PDF.`);
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Your browser could not prepare a page canvas.");
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const renderedWidth = canvas.width;
        const renderedHeight = canvas.height;
        const mime = format === "jpg" ? "image/jpeg" : "image/png";
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, format === "jpg" ? 0.9 : undefined));
        canvas.width = 1; canvas.height = 1;
        page.cleanup();
        if (!blob) throw new Error(`The browser could not create page ${pageNumber}.`);
        const outputBytes = created.reduce((sum, item) => sum + item.blob.size, 0) + blob.size;
        if (outputBytes > LIMITS.outputBytes) throw new Error(`Rendering stopped at the ${formatBytes(LIMITS.outputBytes)} output budget.`);
        const item = { name: `page-${String(pageNumber).padStart(3, "0")}.${format}`, blob, url: URL.createObjectURL(blob), width: renderedWidth, height: renderedHeight };
        created.push(item); setPages([...created]);
      }
      if (!created.length) throw new Error("This PDF has no renderable pages.");
      setStatus("");
    } catch (renderError) {
      created.forEach((page) => URL.revokeObjectURL(page.url)); setPages([]);
      if (renderError instanceof DOMException && renderError.name === "AbortError") setStatus("Rendering cancelled.");
      else setError(renderError instanceof Error ? renderError.message : "This PDF could not be rendered. It may be corrupt or password-protected.");
    } finally { cleanupPdf?.(); setBusy(false); abortRef.current = null; }
  }

  async function downloadAll() {
    if (!pages.length) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip(); pages.forEach((page) => zip.file(page.name, page.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "filekind-pages.zip"; link.click(); URL.revokeObjectURL(url);
  }

  return <ToolLayout active="pdf-images"><section className="intro"><h1>Convert PDF Pages to JPG or PNG</h1><p className="intro-copy">Render each complete PDF page as an image locally. Embedded pictures are not extracted.</p></section><div className="tool-grid"><section className="tool-panel" aria-labelledby="pdf-images-heading"><div className="panel-heading"><div><h2 id="pdf-images-heading">{pages.length ? `${pages.length} pages ready` : "Choose a PDF"}</h2><p className="small-note">Up to 50 MB, 100 pages, and 150 MB total output</p></div></div>{!pages.length && <><label className="dropzone" htmlFor="pdf-file"><span className="upload-icon" aria-hidden="true">+</span><strong>{file ? file.name : "Choose a PDF"}</strong><span>{file ? formatBytes(file.size) : "PDF pages stay on this device"}</span><input className="file-input" id="pdf-file" type="file" accept="application/pdf" onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) chooseFile(nextFile); event.target.value = ""; }} disabled={busy} /></label><div className="controls converter-controls"><div><label className="field-label" htmlFor="image-format">Image format</label><select className="select-input format-select" id="image-format" value={format} onChange={(event) => setFormat(event.target.value as "jpg" | "png")}><option value="jpg">JPG</option><option value="png">PNG</option></select></div><div><button className="primary-button" type="button" onClick={generate} disabled={busy || !file}>{busy ? "Rendering..." : "Generate images"}</button>{busy && <button className="secondary-button" type="button" onClick={() => abortRef.current?.abort()} style={{ marginTop: 8, width: "100%" }}>Cancel</button>}</div></div></>}{pages.length > 0 && <><button className="primary-button" type="button" onClick={() => void downloadAll()}>Download all ZIP</button><div className="page-thumbnails">{pages.map((page) => <article className="page-thumbnail" key={page.name}><img src={page.url} alt={`Preview of ${page.name}`} /><strong>{page.name}</strong><a className="secondary-button" href={page.url} download={page.name}>Download page</a></article>)}</div><button className="secondary-button" type="button" onClick={() => { setPages([]); setFile(null); setStatus(""); }}>Choose another PDF</button></>}{status && <p className="status" role="status" aria-live="polite">{status}</p>}{error && <p className="message error" role="alert">{error}</p>}</section></div><section className="info-panel"><h2>Conservative processing limits</h2><p>Files are rendered sequentially with bounded resolution to keep memory use predictable. Password-protected and corrupt PDFs are rejected with a clear message.</p></section><PageFooter /></ToolLayout>;
}
