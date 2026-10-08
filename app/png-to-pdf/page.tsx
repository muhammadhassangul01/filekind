import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";
import VariantSeo from "../components/variant-seo";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/content/types";

const faqs: Faq[] = [
  {
    question: "How do I convert a PNG to a PDF?",
    answer:
      "Select your PNG files, arrange them in the order you want, choose a page size, and create the PDF. The document is assembled in your browser and downloads as a single file.",
  },
  {
    question: "Is PNG to PDF lossless?",
    answer:
      "PNG images are embedded as PNG, so the pixel data is not converted to a lossy JPEG. Transparent areas are flattened onto the page, because a PDF page itself has no transparency.",
  },
  {
    question: "Can I combine several PNG images into one PDF?",
    answer:
      "Yes. Every selected PNG becomes one page, and you can reorder, remove, or add pages before generating the final document.",
  },
  {
    question: "Does the PDF get uploaded?",
    answer:
      "No. Files are read and drawn locally in your browser. Nothing is sent to a server, and no copy of your images or PDF is kept.",
  },
  {
    question: "What is the size limit for PNG images?",
    answer:
      "Images up to 25 MB, 16,000 pixels per side, and 48 megapixels are accepted. Because everything runs on your device, very large images also depend on available memory.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "PNG to PDF Converter Online Free",
  description:
    "Convert PNG images to a PDF in your browser. Keep image detail, combine several PNGs into one document, and download free with no signup.",
  path: "/png-to-pdf",
  keywords: [
    "png to pdf",
    "png to pdf converter",
    "convert png to pdf",
    "image to pdf",
    "png to pdf online",
    "combine png into pdf",
  ],
});

export default function PngToPdfPage() {
  return (
    <ImagesToPdf
      seo={
        <VariantSeo
          heading="Put PNG images on PDF pages"
          paragraphs={[
            "PNG files keep sharp edges and transparency, which makes them common for screenshots, logos, and diagrams. Converting them to PDF gathers those images into one document that opens anywhere without an image editor.",
            "Filekind draws each PNG onto its own page inside your browser. Choose fit page to size the page around the picture, or A4 and US Letter when the document must match a standard paper size.",
          ]}
          list={[
            "Choose one or more PNG images up to 25 MB each.",
            "Reorder the pages by dragging the rows.",
            "Pick a page size, orientation, and optional margin.",
            "Create the PDF and download it.",
          ]}
          related={[
            { href: "/images-to-pdf", label: "Combine JPG, PNG, and WebP images" },
            { href: "/convert-image/png-to-jpg", label: "Convert PNG to JPG" },
            { href: "/glossary/transparency", label: "How transparency works" },
          ]}
        />
      }
      variant={{
        title: "Convert PNG to PDF",
        intro: "Turn PNG images into a PDF document locally in your browser, with one image per page and no upload.",
        accept: ["image/png"],
        inputLabel: "PNG images, up to 25 MB each",
        faqs,
        breadcrumbs: [{ name: "Home", href: "/" }, { name: "PNG to PDF" }],
      }}
    />
  );
}
