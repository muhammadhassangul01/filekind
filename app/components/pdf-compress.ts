import { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber, PDFObject, PDFRawStream, PDFRef } from "pdf-lib";
import { PDF_LIMITS, readablePdfError } from "./pdf-ops";

export type CompressionLevel = "light" | "medium" | "strong";

export type LevelInfo = { label: string; quality: number; scale: number; note: string };

export const COMPRESSION_LEVELS: Record<CompressionLevel, LevelInfo> = {
  light: { label: "Light", quality: 0.8, scale: 1, note: "Keeps photos close to the original and saves the least space." },
  medium: { label: "Medium", quality: 0.6, scale: 1, note: "A balanced drop in image quality for a clearly smaller file." },
  strong: { label: "Strong", quality: 0.42, scale: 0.7, note: "Rebuilds images smaller and softer for the biggest saving." },
};

export type CompressionResult = {
  bytes: Uint8Array;
  before: number;
  after: number;
  images: number;
  rebuilt: number;
  skipped: number;
};

type Hooks = { onProgress?: (message: string) => void; signal?: AbortSignal };

const canInflate = typeof DecompressionStream !== "undefined";

function nameOf(value: PDFObject | undefined): string | null {
  return value instanceof PDFName ? value.asString().replace(/^\//, "") : null;
}

function filterNames(dict: PDFDict): string[] {
  const filter = dict.lookup(PDFName.of("Filter"));
  if (filter instanceof PDFName) return [filter.asString().replace(/^\//, "")];
  if (filter instanceof PDFArray) return filter.asArray().map(nameOf).filter((value): value is string => Boolean(value));
  return [];
}

function numberValue(dict: PDFDict, key: string): number | null {
  const value = dict.lookup(PDFName.of(key));
  if (value instanceof PDFNumber) {
    const parsed = value.asNumber();
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

function colorSpaceOf(dict: PDFDict): string | null {
  return nameOf(dict.lookup(PDFName.of("ColorSpace")));
}

function componentsOf(dict: PDFDict): number | null {
  const colorSpace = colorSpaceOf(dict);
  if (!colorSpace) return 3;
  if (colorSpace === "DeviceRGB") return 3;
  if (colorSpace === "DeviceGray" || colorSpace === "G") return 1;
  return null;
}

async function inflate(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data.slice() as BlobPart]).stream().pipeThrough(new DecompressionStream("deflate"));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

async function encodeJpeg(source: ImageBitmap | HTMLCanvasElement, quality: number): Promise<Uint8Array | null> {
  const canvas = source instanceof HTMLCanvasElement ? source : document.createElement("canvas");
  const owned = canvas !== source;
  if (owned) {
    canvas.width = source.width;
    canvas.height = source.height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.drawImage(source, 0, 0);
  }
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (owned) {
    canvas.width = 1;
    canvas.height = 1;
  }
  if (!blob) return null;
  return new Uint8Array(await blob.arrayBuffer());
}

function closeSource(source: ImageBitmap | HTMLCanvasElement): void {
  if ("close" in source) source.close();
}

async function decodeSource(stream: PDFRawStream): Promise<ImageBitmap | HTMLCanvasElement | null> {
  const dict = stream.dict;
  const filters = filterNames(dict);
  const width = numberValue(dict, "Width");
  const height = numberValue(dict, "Height");
  if (!width || !height) return null;

  if (filters.length === 1 && filters[0] === "DCTDecode") {
    try {
      const blob = new Blob([stream.getContents().slice() as BlobPart], { type: "image/jpeg" });
      return await createImageBitmap(blob);
    } catch {
      return null;
    }
  }

  if (filters.length === 1 && filters[0] === "FlateDecode" && canInflate && !dict.get(PDFName.of("DecodeParms"))) {
    const components = componentsOf(dict);
    if (!components) return null;
    let raw: Uint8Array;
    try {
      raw = await inflate(stream.getContents());
    } catch {
      return null;
    }
    if (raw.length !== width * height * components) return null;
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let index = 0, source = 0; index < pixels.length; index += 4, source += components) {
      const red = raw[source];
      const green = components === 1 ? red : raw[source + 1];
      const blue = components === 1 ? red : raw[source + 2];
      pixels[index] = red;
      pixels[index + 1] = green;
      pixels[index + 2] = blue;
      pixels[index + 3] = 255;
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.putImageData(new ImageData(pixels, width, height), 0, 0);
    return canvas;
  }

  return null;
}

function collectXObjects(dict: PDFDict, images: PDFRef[], forms: PDFRef[], seen: Set<string>): void {
  const xobjects = dict.lookup(PDFName.of("XObject"));
  if (!(xobjects instanceof PDFDict)) return;
  for (const [, value] of xobjects.entries()) {
    if (!(value instanceof PDFRef)) continue;
    const key = `${value.objectNumber}-${value.generationNumber}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const object = xobjects.context.lookup(value);
    const objectDict = object instanceof PDFRawStream ? object.dict : object instanceof PDFDict ? object : null;
    if (!objectDict) continue;
    const subtype = nameOf(objectDict.lookup(PDFName.of("Subtype")));
    if (subtype === "Image") images.push(value);
    else if (subtype === "Form") {
      forms.push(value);
      const nested = objectDict.lookupMaybe(PDFName.of("Resources"), PDFDict);
      if (nested) collectXObjects(nested, images, forms, seen);
    }
  }
}

function refKey(ref: PDFRef): string {
  return `${ref.objectNumber}-${ref.generationNumber}`;
}

function uniqueRefs(refs: PDFRef[]): PDFRef[] {
  const keys = new Set<string>();
  const unique: PDFRef[] = [];
  for (const ref of refs) {
    const key = refKey(ref);
    if (keys.has(key)) continue;
    keys.add(key);
    unique.push(ref);
  }
  return unique;
}

export async function compressPdf(bytes: Uint8Array, level: CompressionLevel, hooks: Hooks = {}): Promise<CompressionResult> {
  const settings = COMPRESSION_LEVELS[level];
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (error) {
    throw new Error(readablePdfError(error));
  }

  const imageRefs: PDFRef[] = [];
  const seen = new Set<string>();
  for (const page of doc.getPages()) {
    const resources = page.node.Resources();
    if (resources) collectXObjects(resources, imageRefs, [], seen);
  }
  const images = uniqueRefs(imageRefs);

  const maskRefs = new Set<string>();
  for (const ref of images) {
    const object = doc.context.lookup(ref);
    if (!(object instanceof PDFDict)) continue;
    const mask = object.get(PDFName.of("SMask"));
    if (mask instanceof PDFRef) maskRefs.add(refKey(mask));
  }

  let rebuilt = 0;
  let skipped = 0;
  for (const [index, ref] of images.entries()) {
    if (hooks.signal?.aborted) throw new DOMException("Compression cancelled", "AbortError");
    hooks.onProgress?.(`Rebuilding image ${index + 1} of ${images.length}...`);
    const stream = doc.context.lookup(ref);
    if (!(stream instanceof PDFRawStream)) {
      skipped += 1;
      continue;
    }
    const dict = stream.dict;
    const hasMask = Boolean(dict.get(PDFName.of("SMask")));
    const colorSpace = colorSpaceOf(dict);
    const blocked = maskRefs.has(refKey(ref)) || dict.get(PDFName.of("Mask")) || dict.get(PDFName.of("Decode")) || colorSpace === "DeviceCMYK" || colorSpace === "Indexed" || (colorSpace !== null && colorSpace !== "DeviceRGB" && colorSpace !== "DeviceGray" && colorSpace !== "G");
    if (blocked) {
      skipped += 1;
      continue;
    }
    const source = await decodeSource(stream);
    if (!source) {
      skipped += 1;
      continue;
    }
    try {
      const sourceWidth = source instanceof HTMLCanvasElement ? source.width : source.width;
      const sourceHeight = source instanceof HTMLCanvasElement ? source.height : source.height;
      const scale = settings.scale < 1 && !hasMask ? settings.scale : 1;
      const targetWidth = Math.max(64, Math.round(sourceWidth * scale));
      const targetHeight = Math.max(64, Math.round(sourceHeight * scale));
      let drawable: ImageBitmap | HTMLCanvasElement = source;
      if (scale !== 1) {
        const scaled = document.createElement("canvas");
        scaled.width = targetWidth;
        scaled.height = targetHeight;
        const context = scaled.getContext("2d");
        if (!context) throw new Error("Your browser could not prepare an image canvas.");
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(source, 0, 0, targetWidth, targetHeight);
        drawable = scaled;
      }
      const encoded = await encodeJpeg(drawable, settings.quality);
      if (drawable !== source && drawable instanceof HTMLCanvasElement) {
        drawable.width = 1;
        drawable.height = 1;
      }
      if (!encoded || encoded.length >= stream.getContentsSize()) {
        skipped += 1;
        continue;
      }
      dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
      dict.set(PDFName.of("BitsPerComponent"), doc.context.obj(8));
      dict.set(PDFName.of("Width"), doc.context.obj(targetWidth));
      dict.set(PDFName.of("Height"), doc.context.obj(targetHeight));
      dict.delete(PDFName.of("DecodeParms"));
      doc.context.assign(ref, PDFRawStream.of(dict, encoded));
      rebuilt += 1;
    } catch {
      skipped += 1;
    } finally {
      closeSource(source);
    }
  }

  if (!images.length) hooks.onProgress?.("No embedded images found. Saving with a compact object structure...");
  const saved = await doc.save({ useObjectStreams: true });
  if (saved.length >= PDF_LIMITS.outputBytes) {
    throw new Error("The result would be larger than the 150 MB output limit. Try a lighter level.");
  }
  return { bytes: saved, before: bytes.length, after: saved.length, images: images.length, rebuilt, skipped };
}
