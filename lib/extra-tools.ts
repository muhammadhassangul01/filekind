export type ExtraToolMode =
  | "grayscale"
  | "sepia"
  | "invert"
  | "blur"
  | "pixelate"
  | "rotate"
  | "flip"
  | "watermark"
  | "square-crop"
  | "webp";

export type ExtraTool = {
  path: string;
  mode: ExtraToolMode;
  title: string;
  description: string;
  label: string;
  keywords: string[];
};

export const extraTools: ExtraTool[] = [
  { path: "grayscale-image", mode: "grayscale", title: "Make an Image Black and White", description: "Convert an image to grayscale in your browser. Your file never leaves your device.", label: "Grayscale image", keywords: ["grayscale image", "black and white image"] },
  { path: "sepia-filter", mode: "sepia", title: "Add a Sepia Filter to an Image", description: "Give a photo a warm sepia tone locally in your browser.", label: "Sepia filter", keywords: ["sepia filter", "sepia photo"] },
  { path: "invert-image-colors", mode: "invert", title: "Invert Image Colors Online", description: "Create a color-inverted version of an image without uploading it.", label: "Invert colors", keywords: ["invert image colors", "negative image"] },
  { path: "blur-image", mode: "blur", title: "Blur an Image Online", description: "Apply a soft blur to an image privately in your browser.", label: "Blur image", keywords: ["blur image", "online image blur"] },
  { path: "pixelate-image", mode: "pixelate", title: "Pixelate an Image Online", description: "Create a pixelated image effect locally with one click.", label: "Pixelate image", keywords: ["pixelate image", "pixel art filter"] },
  { path: "rotate-image", mode: "rotate", title: "Rotate an Image 90 Degrees", description: "Turn an image clockwise and download the corrected file.", label: "Rotate image", keywords: ["rotate image", "rotate photo"] },
  { path: "flip-image", mode: "flip", title: "Flip an Image Horizontally", description: "Mirror an image horizontally in your browser.", label: "Flip image", keywords: ["flip image", "mirror image"] },
  { path: "watermark-image", mode: "watermark", title: "Add a Watermark to an Image", description: "Add a simple text watermark to an image without uploading the original.", label: "Watermark image", keywords: ["watermark image", "add text to image"] },
  { path: "square-crop-image", mode: "square-crop", title: "Crop an Image to a Square", description: "Center-crop an image to a square for profiles and social platforms.", label: "Square crop", keywords: ["square crop image", "crop photo square"] },
  { path: "convert-image-to-webp", mode: "webp", title: "Optimize an Image as WebP", description: "Convert a JPG or PNG to a compact WebP image in your browser.", label: "Optimize as WebP", keywords: ["image to webp", "webp converter"] },
];

export function getExtraTool(path: string): ExtraTool | undefined {
  return extraTools.find((tool) => tool.path === path);
}
