export const MAX_INPUT_BYTES = 25_000_000;
export const MAX_DIMENSION = 16_000;
export const MAX_PIXELS = 48_000_000;

export type ImageInfo = { width: number; height: number; url: string };

export function formatBytes(bytes: number): string {
  if (bytes < 1_000) return `${bytes} B`;
  if (bytes < 1_000_000) return `${(bytes / 1_000).toFixed(bytes < 10_000 ? 1 : 0)} KB`;
  return `${(bytes / 1_000_000).toFixed(bytes < 10_000_000 ? 2 : 1)} MB`;
}

export function formatDimensions(width: number, height: number): string {
  return `${width.toLocaleString()} x ${height.toLocaleString()} px`;
}

export function validateInput(file: File, types: string[]): string | null {
  if (!types.includes(file.type)) return "Choose a supported JPEG, PNG, or static WebP image file.";
  if (file.size > MAX_INPUT_BYTES) return "This file is larger than the 25 MB supported limit.";
  if (file.size === 0) return "That file is empty. Choose a different image.";
  return null;
}

export type ImageFormat = "jpg" | "png" | "webp";

export const imageMimeTypes: Record<ImageFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export function detectImageFormat(file: File): ImageFormat | null {
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return null;
}

export function formatLabel(format: ImageFormat): string {
  return format === "jpg" ? "JPG" : format.toUpperCase();
}

export async function isAnimatedWebP(file: File): Promise<boolean> {
  if (file.type !== "image/webp") return false;
  const bytes = new Uint8Array(await file.slice(0, Math.min(file.size, 2_000_000)).arrayBuffer());
  let text = "";
  for (let index = 0; index + 3 < bytes.length; index += 1) text += String.fromCharCode(bytes[index], bytes[index + 1], bytes[index + 2], bytes[index + 3]);
  return text.includes("ANIM") || text.includes("ANMF");
}

export async function decodeImage(file: File): Promise<ImageInfo> {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) throw new Error("Image has no usable dimensions.");
    const pixels = image.naturalWidth * image.naturalHeight;
    if (image.naturalWidth > MAX_DIMENSION || image.naturalHeight > MAX_DIMENSION || pixels > MAX_PIXELS) {
      throw new Error(`This image is ${image.naturalWidth.toLocaleString()} x ${image.naturalHeight.toLocaleString()} px. Use an image up to ${MAX_DIMENSION.toLocaleString()} px per side and ${MAX_PIXELS / 1_000_000} megapixels.`);
    }
    return { width: image.naturalWidth, height: image.naturalHeight, url };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error instanceof Error ? error : new Error("This image could not be decoded.");
  }
}

export function releaseImage(info: ImageInfo | null): void {
  if (info) URL.revokeObjectURL(info.url);
}

async function orientedSource(file: File, url: string): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
    }
  }
  const image = new Image();
  image.src = url;
  await image.decode();
  return image;
}

function closeSource(source: ImageBitmap | HTMLImageElement): void {
  if ("close" in source) source.close();
}

function sourceDimensions(source: ImageBitmap | HTMLImageElement): { width: number; height: number } {
  return source instanceof HTMLImageElement
    ? { width: source.naturalWidth, height: source.naturalHeight }
    : { width: source.width, height: source.height };
}

export async function canvasBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (!blob) throw new Error("Your browser could not create a JPEG from this image.");
  return blob;
}

export async function compressToTarget(file: File, targetBytes: number, signal?: AbortSignal): Promise<{ blob: Blob; width: number; height: number }> {
  const info = await decodeImage(file);
  const source = await orientedSource(file, info.url);
  const dimensions = sourceDimensions(source);
  let width = dimensions.width;
  let height = dimensions.height;
  let best: { blob: Blob; width: number; height: number } | null = null;

  try {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      if (signal?.aborted) throw new DOMException("Compression cancelled", "AbortError");
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not prepare this image.");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(source, 0, 0, width, height);

      let low = 0.35;
      let high = 0.92;
      for (let pass = 0; pass < 8; pass += 1) {
        if (signal?.aborted) throw new DOMException("Compression cancelled", "AbortError");
        const quality = (low + high) / 2;
        const blob = await canvasBlob(canvas, quality);
        if (blob.size <= targetBytes) {
          best = { blob, width, height };
          low = quality;
        } else {
          high = quality;
        }
      }
      const lowest = await canvasBlob(canvas, 0.35);
      if (lowest.size <= targetBytes) best = { blob: lowest, width, height };
      if (best) return best;
      width = Math.max(320, Math.floor(width * 0.82));
      height = Math.max(320, Math.floor(height * 0.82));
      if (width === 320 && height === 320) break;
    }
    throw new Error("This image cannot reach that target without becoming impractically small. Try a larger target.");
  } finally {
    closeSource(source);
    URL.revokeObjectURL(info.url);
  }
}

export async function pngToJpeg(file: File, signal?: AbortSignal): Promise<{ blob: Blob; width: number; height: number }> {
  const info = await decodeImage(file);
  try {
    if (signal?.aborted) throw new DOMException("Conversion cancelled", "AbortError");
    const source = await orientedSource(file, info.url);
    try {
      const dimensions = sourceDimensions(source);
      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not prepare this image.");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, dimensions.width, dimensions.height);
      context.drawImage(source, 0, 0);
      const blob = await canvasBlob(canvas, 0.92);
      return { blob, width: dimensions.width, height: dimensions.height };
    } finally {
      closeSource(source);
    }
  } finally {
    URL.revokeObjectURL(info.url);
  }
}

export async function convertImage(file: File, outputFormat: ImageFormat, signal?: AbortSignal): Promise<{ blob: Blob; width: number; height: number }> {
  const info = await decodeImage(file);
  const source = await orientedSource(file, info.url);
  try {
    if (signal?.aborted) throw new DOMException("Conversion cancelled", "AbortError");
    const dimensions = sourceDimensions(source);
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare this image.");
    if (outputFormat === "jpg") {
      context.fillStyle = "#fff";
      context.fillRect(0, 0, dimensions.width, dimensions.height);
    }
    context.drawImage(source, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, imageMimeTypes[outputFormat], outputFormat === "jpg" ? 0.92 : undefined));
    if (!blob || blob.type !== imageMimeTypes[outputFormat]) throw new Error(`Your browser could not create a ${formatLabel(outputFormat)} file.`);
    return { blob, width: dimensions.width, height: dimensions.height };
  } finally {
    closeSource(source);
    URL.revokeObjectURL(info.url);
  }
}

export async function jpegToPng(file: File, signal?: AbortSignal): Promise<{ blob: Blob; width: number; height: number }> {
  const info = await decodeImage(file);
  try {
    if (signal?.aborted) throw new DOMException("Conversion cancelled", "AbortError");
    const source = await orientedSource(file, info.url);
    try {
      const dimensions = sourceDimensions(source);
      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not prepare this image.");
      context.drawImage(source, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Your browser could not create a PNG from this image.");
      return { blob, width: dimensions.width, height: dimensions.height };
    } finally {
      closeSource(source);
    }
  } finally {
    URL.revokeObjectURL(info.url);
  }
}
