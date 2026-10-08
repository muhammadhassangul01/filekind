import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const BLUE = "#2166e5";
const INK = "#172033";
const MUTED = "#647089";
const FOLD = "#bcd2ff";

/** Document glyph drawn inside a 0 0 512 512 coordinate space. */
function documentGlyph({ body = "#ffffff", lines = BLUE, fold = FOLD, x = 120, y = 45, w = 272, h = 422 } = {}) {
  const r = Math.round(w * 0.1);
  const foldSize = Math.round(w * 0.3);
  const lineW = Math.round(w * 0.56);
  const lineH = Math.max(6, Math.round(h * 0.05));
  const gap = Math.round(h * 0.09);
  const lineX = x + Math.round(w * 0.16);
  let lineY = y + Math.round(h * 0.42);
  let linesSvg = "";
  for (let i = 0; i < 3; i += 1) {
    const width = i === 2 ? Math.round(lineW * 0.68) : lineW;
    linesSvg += `<rect x="${lineX}" y="${lineY}" width="${width}" height="${lineH}" rx="${Math.round(lineH / 2)}" fill="${lines}"/>`;
    lineY += lineH + gap;
  }
  return `<path d="M${x + r} ${y} H${x + w - foldSize} L${x + w} ${y + foldSize} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z" fill="${body}"/><path d="M${x + w - foldSize} ${y} L${x + w} ${y + foldSize} H${x + w - foldSize + r} A${r} ${r} 0 0 1 ${x + w - foldSize} ${y + foldSize - r} Z" fill="${fold}"/>${linesSvg}`;
}

/** Scales the 512-space glyph to fit a square canvas of `size`. */
function fitGlyph(size, ratio, options = {}) {
  const glyphW = 272;
  const glyphH = 422;
  const glyphX = 120;
  const glyphY = 45;
  const scale = (size * ratio) / glyphH;
  const tx = (size - glyphW * scale) / 2 - glyphX * scale;
  const ty = (size - glyphH * scale) / 2 - glyphY * scale;
  return `<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">${documentGlyph(options)}</g>`;
}

function tileIcon(size, rx) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${rx}" fill="${BLUE}"/>${fitGlyph(size, 0.62)}</svg>`;
}

function maskableIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${BLUE}"/>${fitGlyph(size, 0.5)}</svg>`;
}

function ogImage() {
  const pill = (x, label, width) =>
    `<rect x="${x}" y="500" width="${width}" height="64" rx="32" fill="#eef4ff" stroke="#c9dcff"/><text x="${x + width / 2}" y="541" font-family="DejaVu Sans, sans-serif" font-size="27" font-weight="bold" fill="${BLUE}" text-anchor="middle">${label}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="10" fill="${BLUE}"/>
  <g><rect x="84" y="70" width="96" height="96" rx="22" fill="${BLUE}"/><g transform="translate(84 70)">${fitGlyph(96, 0.66)}</g></g>
  <text x="204" y="134" font-family="DejaVu Sans, sans-serif" font-size="46" font-weight="bold" fill="${INK}">Filekind</text>
  <text x="1116" y="134" font-family="DejaVu Sans, sans-serif" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="end">filekind.tech</text>
  <text x="84" y="308" font-family="DejaVu Sans, sans-serif" font-size="74" font-weight="bold" fill="${INK}">Free image and PDF tools</text>
  <text x="84" y="374" font-family="DejaVu Sans, sans-serif" font-size="33" fill="${MUTED}">Compress, resize, convert, and build PDFs in your browser.</text>
  <text x="84" y="422" font-family="DejaVu Sans, sans-serif" font-size="33" fill="${MUTED}">Files never leave your device. No signup, no watermark.</text>
  ${pill(84, "Compress to 200 KB", 300)}
  ${pill(404, "JPG to PNG", 232)}
  ${pill(656, "Images to PDF", 260)}
  ${pill(936, "Resize image", 236)}
</svg>`;
}

async function render(svg, width, height, fileName) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).resize(width, height).toFile(path.join(publicDir, fileName));
  console.log(`wrote ${fileName}`);
}

await mkdir(publicDir, { recursive: true });

await render(tileIcon(512, 96), 512, 512, "icon-512.png");
await render(tileIcon(192, 42), 192, 192, "icon-192.png");
await render(maskableIcon(512), 512, 512, "icon-maskable-512.png");
await render(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="${BLUE}"/>${fitGlyph(180, 0.6)}</svg>`, 180, 180, "apple-touch-icon.png");
await render(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${BLUE}"/>${fitGlyph(32, 0.64)}</svg>`, 32, 32, "favicon-32.png");
await render(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" rx="3.5" fill="${BLUE}"/>${fitGlyph(16, 0.66)}</svg>`, 16, 16, "favicon-16.png");
await render(ogImage(), 1200, 630, "og.png");
