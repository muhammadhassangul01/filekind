import type { Metadata } from "next";
import ImageConverter from "../components/image-converter";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Convert JPG, PNG and WebP Images Online Free",
  description:
    "Convert JPG, PNG, and static WebP images in any direction in your browser. Free image converter with no upload, no signup, and no watermark.",
  path: "/convert-image",
  keywords: [
    "image converter",
    "convert image",
    "jpg to png",
    "png to jpg",
    "webp to jpg",
    "jpg to webp",
    "convert photo online",
    "image format converter",
  ],
});

export default function ConvertImagePage() {
  return <ImageConverter />;
}
