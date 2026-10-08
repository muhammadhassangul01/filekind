import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";
import { ImagesToPdfSeoContent, imagesToPdfPanelFaq } from "../components/seo-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Convert Images to PDF Online Free (JPG, PNG, WebP)",
  description:
    "Turn photos into one PDF in your browser. Reorder pages, choose fit, A4, or Letter, set margins, and download instantly with no upload.",
  path: "/images-to-pdf",
  keywords: [
    "images to pdf",
    "image to pdf",
    "photo to pdf",
    "jpg to pdf",
    "combine images into one pdf",
    "make pdf from photos",
    "convert picture to pdf",
  ],
});

export default function ImagesToPdfPage() {
  return <ImagesToPdf seo={<ImagesToPdfSeoContent />} panelFaq={imagesToPdfPanelFaq} />;
}
