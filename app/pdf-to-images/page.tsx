import type { Metadata } from "next";
import PdfToImages from "../components/pdf-to-images";
import { PdfToImagesSeoContent, pdfToImagesPanelFaq } from "../components/seo-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Convert PDF to JPG or PNG Images Online Free",
  description:
    "Turn every PDF page into a JPG or PNG image in your browser. Download single pages or a ZIP, with no upload, no signup, and no watermark.",
  path: "/pdf-to-images",
  keywords: [
    "pdf to images",
    "pdf to jpg",
    "pdf to png",
    "convert pdf to image",
    "pdf pages to jpg",
    "extract pdf pages as images",
  ],
});

export default function PdfToImagesPage() {
  return <PdfToImages seo={<PdfToImagesSeoContent />} panelFaq={pdfToImagesPanelFaq} />;
}
