import type { Metadata } from "next";
import ResizeImage from "../components/resize-image";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resize Image Online Free (Width and Height in Pixels)",
  description:
    "Resize photos by percentage or exact pixels in your browser. Lock the aspect ratio, choose JPG or PNG, and download with no upload or signup.",
  path: "/resize-image",
  keywords: [
    "resize image",
    "image resizer",
    "resize photo",
    "change image size",
    "reduce image resolution",
    "resize image to 1080x1080",
    "scale image online",
    "resize picture",
  ],
});

export default function ResizeImagePage() {
  return <ResizeImage />;
}
