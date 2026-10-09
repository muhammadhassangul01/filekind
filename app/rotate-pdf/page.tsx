import type { Metadata } from "next";
import RotatePdf from "../components/rotate-pdf";
import { RotatePdfSeoContent, rotatePdfPanelFaq } from "../components/seo-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rotate PDF Pages Online Free, Left or Right",
  description:
    "Turn single pages or a whole document left or right, preview each angle, and save a new PDF with the original quality kept on your device.",
  path: "/rotate-pdf",
  keywords: ["rotate pdf", "rotate pdf pages", "turn pdf page", "rotate pdf online", "flip pdf page", "pdf rotation tool"],
});

export default function Page() {
  return <RotatePdf seo={<RotatePdfSeoContent />} panelFaq={rotatePdfPanelFaq} />;
}
