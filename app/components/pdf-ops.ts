export const PDF_LIMITS = {
  inputBytes: 50_000_000,
  pages: 100,
  outputBytes: 150_000_000,
  files: 20,
  previewPixels: 60_000_000,
};

export type PagePreview = { page: number; url: string; width: number; height: number };

export function pdfFileRejection(file: File): string | null {
  const looksLikePdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!looksLikePdf) return "Choose a PDF file.";
  if (file.size === 0) return "That file is empty. Choose a different PDF.";
  if (file.size > PDF_LIMITS.inputBytes) return `This PDF is larger than the ${formatMb(PDF_LIMITS.inputBytes)} supported limit.`;
  return null;
}

export function formatMb(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(0)} MB`;
}

export async function readPdfBytes(file: File): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer());
}

async function pdfLib() {
  return import("pdf-lib");
}

export async function pdfPageCount(bytes: Uint8Array): Promise<number> {
  const { PDFDocument } = await pdfLib();
  try {
    const doc = await PDFDocument.load(bytes, { updateMetadata: false });
    return doc.getPageCount();
  } catch (error) {
    throw new Error(readablePdfError(error));
  }
}

export function readablePdfError(error: unknown): string {
  const name = error instanceof Error ? error.name : "";
  const message = error instanceof Error ? error.message : "";
  if (name.includes("Encrypted") || /encrypt/i.test(message)) {
    return "This PDF is password-protected. Password-protected PDFs are not supported.";
  }
  if (name.includes("EmptyTypedArray") || /end of file|invalid|corrupt/i.test(message)) {
    return "This PDF could not be read. It may be corrupt or incomplete.";
  }
  return message || "This PDF could not be processed.";
}

export async function loadPdfjs(): Promise<typeof import("pdfjs-dist")> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
  return pdfjs;
}

export async function renderPagePreviews(
  bytes: Uint8Array,
  options: { signal?: AbortSignal; maxPages?: number; targetWidth?: number } = {},
): Promise<PagePreview[]> {
  const targetWidth = options.targetWidth ?? 240;
  const maxPages = options.maxPages ?? PDF_LIMITS.pages;
  const pdfjs = await loadPdfjs();
  const loadingTask = pdfjs.getDocument({ data: bytes.slice() });
  loadingTask.onPassword = (_callback: unknown, reason: number) => {
    throw new Error(reason === 1 ? "This PDF is password-protected. Password-protected PDFs are not supported." : "This PDF requires a password.");
  };
  const pdf = await loadingTask.promise;
  try {
    if (pdf.numPages > PDF_LIMITS.pages) throw new Error(`This PDF has ${pdf.numPages} pages. The limit is ${PDF_LIMITS.pages}.`);
    const previews: PagePreview[] = [];
    let usedPixels = 0;
    const lastPage = Math.min(pdf.numPages, maxPages);
    for (let pageNumber = 1; pageNumber <= lastPage; pageNumber += 1) {
      if (options.signal?.aborted) throw new DOMException("Rendering cancelled", "AbortError");
      const page = await pdf.getPage(pageNumber);
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(1.4, targetWidth / base.width);
      const viewport = page.getViewport({ scale });
      const width = Math.max(1, Math.round(viewport.width));
      const height = Math.max(1, Math.round(viewport.height));
      usedPixels += width * height;
      if (usedPixels > PDF_LIMITS.previewPixels) {
        previews.push(...(await renderRemainingAsPlaceholders(pdf, pageNumber, lastPage, width, height)));
        break;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not prepare a page canvas.");
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      const url = canvas.toDataURL("image/jpeg", 0.72);
      canvas.width = 1;
      canvas.height = 1;
      page.cleanup();
      previews.push({ page: pageNumber, url, width, height });
    }
    return previews;
  } finally {
    await loadingTask.destroy();
  }
}

async function renderRemainingAsPlaceholders(
  pdf: Awaited<ReturnType<typeof import("pdfjs-dist").getDocument>["promise"]>,
  from: number,
  to: number,
  width: number,
  height: number,
): Promise<PagePreview[]> {
  const blank = document.createElement("canvas");
  blank.width = width;
  blank.height = height;
  const context = blank.getContext("2d");
  if (context) {
    context.fillStyle = "#f4f6f9";
    context.fillRect(0, 0, width, height);
  }
  const url = blank.toDataURL("image/jpeg", 0.5);
  blank.width = 1;
  blank.height = 1;
  const placeholders: PagePreview[] = [];
  for (let pageNumber = from; pageNumber <= to; pageNumber += 1) {
    placeholders.push({ page: pageNumber, url, width, height });
  }
  void pdf;
  return placeholders;
}

export async function mergePdfFiles(items: { bytes: Uint8Array }[], signal?: AbortSignal): Promise<Uint8Array> {
  const { PDFDocument } = await pdfLib();
  const output = await PDFDocument.create();
  let total = 0;
  for (const [index, item] of items.entries()) {
    if (signal?.aborted) throw new DOMException("Merge cancelled", "AbortError");
    let source: Awaited<ReturnType<typeof PDFDocument.load>>;
    try {
      source = await PDFDocument.load(item.bytes, { updateMetadata: false });
    } catch (error) {
      throw new Error(`File ${index + 1}: ${readablePdfError(error)}`);
    }
    const pages = source.getPageCount();
    if (total + pages > PDF_LIMITS.pages) {
      throw new Error(`The merged document would have more than ${PDF_LIMITS.pages} pages. Remove a file or split it first.`);
    }
    const copied = await output.copyPages(source, source.getPageIndices());
    for (const page of copied) output.addPage(page);
    total += pages;
  }
  if (!output.getPageCount()) throw new Error("Choose at least one PDF to merge.");
  return output.save({ useObjectStreams: true });
}

export async function buildPdfWithPages(bytes: Uint8Array, pages: number[], signal?: AbortSignal): Promise<Uint8Array> {
  const { PDFDocument } = await pdfLib();
  const source = await loadSource(bytes);
  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, pages.map((page) => page - 1));
  for (const page of copied) {
    if (signal?.aborted) throw new DOMException("Split cancelled", "AbortError");
    output.addPage(page);
  }
  if (!output.getPageCount()) throw new Error("Select at least one page.");
  return output.save({ useObjectStreams: true });
}

export async function buildPagePdfs(bytes: Uint8Array, pages: number[], signal?: AbortSignal): Promise<{ name: string; bytes: Uint8Array }[]> {
  const { PDFDocument } = await pdfLib();
  const source = await loadSource(bytes);
  const results: { name: string; bytes: Uint8Array }[] = [];
  for (const page of pages) {
    if (signal?.aborted) throw new DOMException("Split cancelled", "AbortError");
    const output = await PDFDocument.create();
    const [copied] = await output.copyPages(source, [page - 1]);
    output.addPage(copied);
    results.push({ name: `page-${String(page).padStart(3, "0")}.pdf`, bytes: await output.save({ useObjectStreams: true }) });
  }
  if (!results.length) throw new Error("Select at least one page.");
  return results;
}

export async function rotatePdfBytes(bytes: Uint8Array, rotations: Map<number, number>, signal?: AbortSignal): Promise<Uint8Array> {
  const { degrees } = await pdfLib();
  const doc = await loadSource(bytes);
  const pages = doc.getPages();
  for (const [pageNumber, delta] of rotations) {
    if (signal?.aborted) throw new DOMException("Rotation cancelled", "AbortError");
    const page = pages[pageNumber - 1];
    if (!page) continue;
    const current = page.getRotation().angle;
    const next = (((current + delta) % 360) + 360) % 360;
    page.setRotation(degrees(next));
  }
  return doc.save({ useObjectStreams: true });
}

export async function loadSource(bytes: Uint8Array) {
  const { PDFDocument } = await pdfLib();
  try {
    return await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (error) {
    throw new Error(readablePdfError(error));
  }
}

export function parsePageRanges(input: string, pageCount: number): number[] {
  const selection = input.trim();
  if (!selection) throw new Error("Enter page numbers, for example 1-3, 5, 8-10.");
  const picked: number[] = [];
  const seen = new Set<number>();
  for (const part of selection.split(",")) {
    const token = part.trim();
    if (!token) continue;
    const range = token.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!range) throw new Error(`"${token}" is not a page number or range.`);
    const start = Number(range[1]);
    const end = range[2] ? Number(range[2]) : start;
    if (start < 1 || end < 1) throw new Error(`"${token}" starts below page 1.`);
    if (start > pageCount || end > pageCount) throw new Error(`"${token}" is outside this ${pageCount}-page document.`);
    if (start > end) throw new Error(`"${token}" runs backwards. Write it as ${end}-${start}.`);
    for (let page = start; page <= end; page += 1) {
      if (seen.has(page)) continue;
      seen.add(page);
      picked.push(page);
    }
  }
  if (!picked.length) throw new Error("Enter page numbers, for example 1-3, 5, 8-10.");
  return picked;
}

export function downloadBytes(data: Uint8Array, name: string, type = "application/pdf"): void {
  const copy = new Uint8Array(data.length);
  copy.set(data);
  const blob = new Blob([copy.buffer], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 10_000);
}
