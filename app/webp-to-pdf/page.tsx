import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";
import VariantSeo from "../components/variant-seo";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/content/types";

const faqs: Faq[] = [
  {
    question: "How do I convert WebP to PDF?",
    answer:
      "Choose your static WebP images, arrange the pages, select a page size, and create the PDF. The conversion runs entirely in your browser and downloads as one document.",
  },
  {
    question: "Do animated WebP files work?",
    answer:
      "No. Animated WebP files are rejected instead of silently losing their animation. Export a static frame first if you need that image in a PDF.",
  },
  {
    question: "Why convert WebP to PDF at all?",
    answer:
      "WebP is a web format, while PDF is a document format that printers, portals, and colleagues expect. A PDF also fixes the page size, so the layout looks the same everywhere.",
  },
  {
    question: "Is my WebP image uploaded?",
    answer:
      "No. The image is read and drawn onto the page in your browser. The file never leaves your device, and nothing is stored after you close the tab.",
  },
  {
    question: "How large can the WebP images be?",
    answer:
      "Each image can be up to 25 MB, 16,000 pixels per side, and 48 megapixels. Multiple images in one document are supported.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "WebP to PDF Converter Online Free",
  description:
    "Convert WebP images to a PDF in your browser. Combine WebP pictures into one document with the page size you need, free and private.",
  path: "/webp-to-pdf",
  keywords: [
    "webp to pdf",
    "webp to pdf converter",
    "convert webp to pdf",
    "webp image to pdf",
    "webp to pdf online",
  ],
});

export default function WebpToPdfPage() {
  return (
    <ImagesToPdf
      seo={
        <VariantSeo
          heading="Turn WebP images into a shareable document"
          paragraphs={[
            "WebP images are small and sharp on the web, but many forms, portals, and print workflows expect a PDF. This page places your WebP files onto PDF pages without uploading them anywhere.",
            "Each image becomes one page. Use fit page to keep the whole picture visible, or A4 and US Letter when the document has to match a standard paper size.",
          ]}
          list={[
            "Choose one or more static WebP images up to 25 MB each.",
            "Arrange the pages in the order you need.",
            "Select fit page, A4, or US Letter and any margin.",
            "Create the PDF and download it.",
          ]}
          related={[
            { href: "/images-to-pdf", label: "Combine JPG, PNG, and WebP images" },
            { href: "/convert-image/webp-to-jpg", label: "Convert WebP to JPG" },
            { href: "/glossary/webp", label: "What is WebP?" },
          ]}
        />
      }
      variant={{
        title: "Convert WebP to PDF",
        intro: "Turn static WebP images into a PDF document locally in your browser, with one image per page.",
        accept: ["image/webp"],
        inputLabel: "Static WebP images, up to 25 MB each",
        faqs,
        breadcrumbs: [{ name: "Home", href: "/" }, { name: "WebP to PDF" }],
      }}
    />
  );
}
