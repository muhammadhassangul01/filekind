import type { Metadata } from "next";
import PdfToImages from "../components/pdf-to-images";
import VariantSeo from "../components/variant-seo";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/content/types";

const faqs: Faq[] = [
  {
    question: "How do I convert a PDF to PNG?",
    answer:
      "Choose a PDF, select PNG as the output format, and generate. Each page becomes a lossless PNG image that you can download on its own or as a ZIP.",
  },
  {
    question: "Why choose PNG instead of JPG?",
    answer:
      "PNG does not add JPEG compression artifacts, so line art, screenshots, and text-heavy pages stay crisp. The trade-off is a larger file for photographic pages.",
  },
  {
    question: "Does this extract the pictures inside a page?",
    answer:
      "No. The tool renders the complete page as one image. Embedded photos and charts become part of that render rather than separate files.",
  },
  {
    question: "What are the limits?",
    answer:
      "PDFs up to 50 MB and 100 pages, with a maximum of 120 million rendered pixels and 150 MB of total output. Password-protected PDFs are not supported.",
  },
  {
    question: "Is the PDF uploaded anywhere?",
    answer:
      "No. Pages are rendered in your browser with pdf.js, so the file never leaves your device and no copy is kept.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "PDF to PNG Converter Online Free",
  description:
    "Convert a PDF into PNG images in your browser. Render every page as a lossless PNG, download single pages or a ZIP, free and private.",
  path: "/pdf-to-png",
  keywords: [
    "pdf to png",
    "pdf to png converter",
    "convert pdf to png",
    "pdf pages to png",
    "pdf to image",
    "pdf to png online",
  ],
});

export default function PdfToPngPage() {
  return (
    <PdfToImages
      seo={
        <VariantSeo
          heading="Render PDF pages as lossless PNG images"
          paragraphs={[
            "PNG is the safer choice when a page contains diagrams, screenshots, small text, or line art, because PNG stores pixels without JPEG artifacts. Convert a PDF to PNG when the page has to stay sharp in a slide deck, wiki, or design file.",
            "Filekind renders the full page locally in your browser and lets you grab a single page or the whole document as a ZIP archive.",
          ]}
          list={[
            "Choose a PDF up to 50 MB.",
            "Select PNG as the output format.",
            "Generate the pages, then download individually or as a ZIP.",
          ]}
          related={[
            { href: "/pdf-to-images", label: "PDF to images tool" },
            { href: "/pdf-to-jpg", label: "Convert PDF to JPG" },
            { href: "/glossary/png", label: "What is PNG?" },
          ]}
        />
      }
      variant={{
        title: "Convert PDF to PNG",
        intro: "Render every page of a PDF as a lossless PNG image in your browser, then download pages individually or as a ZIP.",
        format: "png",
        formatLabel: "PNG",
        faqs,
        breadcrumbs: [{ name: "Home", href: "/" }, { name: "PDF to images", href: "/pdf-to-images" }, { name: "PDF to PNG" }],
      }}
    />
  );
}
