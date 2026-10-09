import type { Metadata } from "next";
import CompressPdf from "../components/compress-pdf";
import { CompressPdfSeoContent, compressPdfPanelFaq } from "../components/seo-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compress PDF Online Free: Smaller File, Same Text",
  description:
    "Make an image-heavy PDF smaller in your browser with three compression levels. Text stays selectable, links keep working, and no file is uploaded.",
  path: "/compress-pdf",
  keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf online", "make pdf smaller", "compress pdf online"],
});

export default function Page() {
  return <CompressPdf seo={<CompressPdfSeoContent />} panelFaq={compressPdfPanelFaq} />;
}
