const QUALITY_FLOOR = 0.35;
const QUALITY_CEILING = 0.92;
const MAX_ATTEMPTS = 12;

function cancelled(state) {
  if (state.aborted) throw new DOMException("Compression cancelled", "AbortError");
}

async function compress(file, targetBytes, state) {
  if (typeof OffscreenCanvas === "undefined" || typeof createImageBitmap !== "function") throw new Error("Worker image compression is not supported.");
  const decodeStarted = performance.now();
  const source = await createImageBitmap(file, { imageOrientation: "from-image" });
  const metrics = { decodeCount: 1, decodeTimeMs: performance.now() - decodeStarted, encodeCount: 0, encodeTimeMs: 0, attempts: [] };
  let width = source.width;
  let height = source.height;
  let best = null;
  try {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      cancelled(state);
      const canvas = new OffscreenCanvas(width, height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not prepare this image.");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(source, 0, 0, width, height);
      const encode = async (quality) => {
        cancelled(state);
        const started = performance.now();
        const blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
        const durationMs = performance.now() - started;
        metrics.encodeCount += 1;
        metrics.encodeTimeMs += durationMs;
        metrics.attempts.push({ attempt, width, height, quality, bytes: blob.size, durationMs });
        return blob;
      };
      const minimum = await encode(QUALITY_FLOOR);
      if (minimum.size <= targetBytes) {
        best = { blob: minimum, width, height };
        const maximum = await encode(QUALITY_CEILING);
        if (maximum.size <= targetBytes) return { ...best, blob: maximum, metrics };
        let low = QUALITY_FLOOR;
        let high = QUALITY_CEILING;
        for (let pass = 0; pass < 4; pass += 1) {
          const quality = (low + high) / 2;
          const blob = await encode(quality);
          if (blob.size <= targetBytes) {
            best = { blob, width, height };
            low = quality;
          } else high = quality;
        }
        return { ...best, metrics };
      }
      width = Math.max(320, Math.floor(width * 0.82));
      height = Math.max(320, Math.floor(height * 0.82));
      if (width === 320 && height === 320) break;
    }
    throw new Error("This image cannot reach that target without becoming impractically small. Try a larger target.");
  } finally {
    source.close();
  }
}

self.onmessage = async (event) => {
  if (event.data?.type !== "compress") return;
  const { file, targetBytes, jobId } = event.data;
  const state = { aborted: false };
  self.__compressionState = state;
  try {
    const result = await compress(file, targetBytes, state);
    const buffer = await result.blob.arrayBuffer();
    self.postMessage({ type: "result", jobId, ...result, blob: buffer }, [buffer]);
  } catch (error) {
    self.postMessage({ type: "error", jobId, name: error instanceof Error ? error.name : "Error", message: error instanceof Error ? error.message : "Compression failed." });
  } finally {
    if (self.__compressionState === state) self.__compressionState = null;
  }
};

self.addEventListener("message", (event) => {
  if (event.data?.type === "cancel" && self.__compressionState) self.__compressionState.aborted = true;
});