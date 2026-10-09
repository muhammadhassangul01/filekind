import type { Metadata } from "next";
import MergePdf from "../components/merge-pdf";
import { MergePdfSeoContent, mergePdfPanelFaq } from "../components/seo-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Merge PDF Files Into One Document, Free Online",
  description:
    "Combine up to 20 PDFs into a single document in the order you choose, right in your browser. Original page quality is kept and nothing is uploaded.",
  path: "/merge-pdf",
  keywords: ["merge pdf", "combine pdf", "merge pdf files", "join pdf online", "pdf merger free", "combine two pdfs"],
});

export default function Page() {
  return <MergePdf seo={<MergePdfSeoContent />} panelFaq={mergePdfPanelFaq} />;
}
