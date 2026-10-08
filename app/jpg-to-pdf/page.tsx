import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";
import VariantSeo from "../components/variant-seo";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/content/types";

const faqs: Faq[] = [
  {
    question: "How do I convert a JPG to a PDF?",
    answer:
      "Choose the JPG images you want, drag them into page order, pick fit, A4, or US Letter, then create the PDF. Each JPG becomes one page and the file downloads straight from your browser.",
  },
  {
    question: "Can I put several JPG images into one PDF?",
    answer:
      "Yes. Select multiple JPGs and each one becomes its own page. Reorder or remove pages before generating, and add more images if you forget one.",
  },
  {
    question: "Is my JPG uploaded to a server?",
    answer:
      "No. The PDF is assembled in your browser with the image drawn onto the page. The file never leaves your device, and nothing is stored after you close the tab.",
  },
  {
    question: "Does converting JPG to PDF reduce quality?",
    answer:
      "The image is re-encoded at the highest JPEG quality when it is placed on the page, so visual change is minimal. The page size and layout you choose affect the final file size more than the conversion itself.",
  },
  {
    question: "How many JPGs can I combine?",
    answer:
      "Each image can be up to 25 MB, 16,000 pixels per side, and 48 megapixels. The practical limit is your device memory, because everything is processed locally.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "JPG to PDF Converter Online Free",
  description:
    "Convert JPG images to a PDF in your browser. Combine several photos into one document, choose page size and margins, and download for free.",
  path: "/jpg-to-pdf",
  keywords: [
    "jpg to pdf",
    "jpg to pdf converter",
    "convert jpg to pdf",
    "jpeg to pdf",
    "image to pdf",
    "photo to pdf",
    "make pdf from jpg",
  ],
});

export default function JpgToPdfPage() {
  return (
    <ImagesToPdf
      seo={
        <VariantSeo
          heading="Convert JPG photos into a PDF document"
          paragraphs={[
            "A JPG to PDF conversion puts one or more photos onto PDF pages so the document opens the same way on any phone, laptop, or printer. Filekind builds the document in your browser, so the photos are never uploaded to a server.",
            "The default setup sizes each page to its image, which keeps the whole photo visible. Switch to A4 or US Letter when the PDF has to match a printable paper size, and add a margin if a form requires space around the image.",
          ]}
          list={[
            "Choose one or more JPG images up to 25 MB each.",
            "Drag pages into the order you want them to appear.",
            "Select fit page, A4, or US Letter, then set orientation and margins.",
            "Create the PDF and download it to your device.",
          ]}
          related={[
            { href: "/images-to-pdf", label: "Combine JPG, PNG, and WebP images" },
            { href: "/convert-image/jpg-to-png", label: "Convert JPG to PNG" },
            { href: "/compress-image", label: "Compress the JPG first" },
          ]}
        />
      }
      variant={{
        title: "Convert JPG to PDF",
        intro: "Turn JPG photos into a PDF document locally in your browser. Add as many JPGs as you like, with one image per page.",
        accept: ["image/jpeg"],
        inputLabel: "JPG images, up to 25 MB each",
        faqs,
        breadcrumbs: [{ name: "Home", href: "/" }, { name: "JPG to PDF" }],
      }}
    />
  );
}
