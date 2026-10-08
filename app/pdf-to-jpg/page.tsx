import type { Metadata } from "next";
import PdfToImages from "../components/pdf-to-images";
import VariantSeo from "../components/variant-seo";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/content/types";

const faqs: Faq[] = [
  {
    question: "How do I convert a PDF to JPG?",
    answer:
      "Choose a PDF, keep JPG selected as the output format, and generate the images. Every page is rendered as a JPEG that you can download individually or as a ZIP archive.",
  },
  {
    question: "Will the text in the PDF stay readable?",
    answer:
      "Yes. Pages are rendered at high resolution, so text and line art stay sharp up to the documented pixel budget. If a page looks soft, the source PDF itself is low resolution.",
  },
  {
    question: "Can I convert a scanned PDF?",
    answer:
      "Yes, as images. Scanned pages render to JPG just like any other page, but Filekind does not run OCR, so the text inside the scan is not recognised or made searchable.",
  },
  {
    question: "How many pages can I convert at once?",
    answer:
      "Up to 100 pages, 120 million rendered pixels, and 150 MB of total output, with a 50 MB limit on the PDF file itself.",
  },
  {
    question: "Is my PDF uploaded?",
    answer:
      "No. Pages are rendered locally with pdf.js in your browser. The document never leaves your device, and no copy is stored.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "PDF to JPG Converter Online Free",
  description:
    "Convert a PDF into JPG images in your browser. Render every page as a JPEG, download single pages or a ZIP, free with no upload.",
  path: "/pdf-to-jpg",
  keywords: [
    "pdf to jpg",
    "pdf to jpg converter",
    "convert pdf to jpg",
    "pdf to jpeg",
    "pdf pages to jpg",
    "pdf to image",
  ],
});

export default function PdfToJpgPage() {
  return (
    <PdfToImages
      seo={
        <VariantSeo
          heading="Export PDF pages as JPEG images"
          paragraphs={[
            "A JPG version of a PDF is useful when a website accepts images but not documents, when you need a page as an email attachment, or when you want a single page from a long report.",
            "Filekind renders the complete page, including any scan, chart, or signature, and lets you download the pages you need. Processing happens locally, so a confidential document stays on your device.",
          ]}
          list={[
            "Choose a PDF up to 50 MB.",
            "Keep JPG selected as the output format.",
            "Generate the pages, then download one page or all pages as a ZIP.",
          ]}
          related={[
            { href: "/pdf-to-images", label: "PDF to images tool" },
            { href: "/pdf-to-png", label: "Convert PDF to PNG" },
            { href: "/compress-image", label: "Compress the result" },
          ]}
        />
      }
      variant={{
        title: "Convert PDF to JPG",
        intro: "Render each page of a PDF as a JPG image locally in your browser, then download pages individually or as a ZIP.",
        format: "jpg",
        formatLabel: "JPG",
        faqs,
        breadcrumbs: [{ name: "Home", href: "/" }, { name: "PDF to images", href: "/pdf-to-images" }, { name: "PDF to JPG" }],
      }}
    />
  );
}
