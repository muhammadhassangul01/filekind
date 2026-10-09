import type { Metadata } from "next";
import SplitPdf from "../components/split-pdf";
import { SplitPdfSeoContent, splitPdfPanelFaq } from "../components/seo-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Split PDF Online Free: Extract or Separate Pages",
  description:
    "Preview every page, choose what to keep with a click or a range, and save one PDF or a ZIP of single-page files. Nothing leaves your device.",
  path: "/split-pdf",
  keywords: ["split pdf", "extract pdf pages", "separate pdf pages", "split pdf online", "remove pages from pdf", "pdf page splitter"],
});

export default function Page() {
  return <SplitPdf seo={<SplitPdfSeoContent />} panelFaq={splitPdfPanelFaq} />;
}
