import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { guideLinks, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";

const pdfTools = toolLinks.filter((link) =>
  ["/images-to-pdf", "/pdf-to-images", "/merge-pdf", "/split-pdf", "/compress-pdf", "/rotate-pdf", "/jpg-to-pdf", "/png-to-pdf", "/webp-to-pdf", "/pdf-to-jpg", "/pdf-to-png"].includes(link.href),
);

const pdfToolNotes: Record<string, string> = {
  "/merge-pdf": "Join up to 20 documents in the order you choose.",
  "/split-pdf": "Keep selected pages or save each page on its own.",
  "/compress-pdf": "Three levels, with text left selectable.",
  "/rotate-pdf": "Turn single pages or the whole document.",
  "/images-to-pdf": "Turn receipts, notes, and snapshots into one PDF.",
  "/pdf-to-images": "Save pages as JPG or PNG, one at a time or as a ZIP.",
};

const faqs = [
  {
    question: "Can I create a PDF from photos without uploading them?",
    answer:
      "Yes. Images are drawn onto PDF pages inside your browser, so the pictures and the finished document never leave your device.",
  },
  {
    question: "Which paper sizes can I use?",
    answer:
      "Fit page sizes each page around its image, while A4 and US Letter use fixed paper sizes with optional margins and automatic or forced orientation.",
  },
  {
    question: "What can Filekind do with an existing PDF?",
    answer:
      "It can merge documents in your order, split out selected pages, turn pages left or right, and compress image-heavy files in your browser. It does not run OCR, edit text, fill forms, or change what a page says.",
  },
  {
    question: "How large can a PDF be?",
    answer:
      "Reading a PDF is limited to 50 MB and 100 pages, with 150 MB of total rendered output. Images added to a PDF can be up to 25 MB each.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Online PDF Tools: Merge, Split, Compress, Convert",
  description:
    "Free browser PDF tools: merge, split, rotate, and compress PDFs, build a PDF from photos, and render pages as JPG or PNG with no upload.",
  path: "/pdf-tools",
  keywords: [
    "online pdf tools",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "rotate pdf",
    "image to pdf",
    "pdf to image",
    "free pdf tools",
  ],
});

export default function PdfToolsHubPage() {
  const path = "/pdf-tools";
  const schema = [
    webpageSchema({
      title: "Online PDF tools",
      description: "Free browser-based tools to build, merge, split, rotate, and compress PDFs, and to turn PDF pages into images.",
      path,
    }),
    itemListSchema({ name: "Filekind PDF tools", links: pdfTools }),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
  ];

  return (
    <ToolLayout active="pdf-tools" breadcrumbs={[{ name: "Home", href: "/" }, { name: "PDF tools" }]}>
      <JsonLd data={schema} />
      <section className="intro">
        <p className="eyebrow">Toolkit</p>
        <h1>Free online PDF tools</h1>
        <p className="intro-copy">
          Build a PDF from photos, join separate documents, pull pages out, turn them, shrink them, or render them as
          images. Everything happens in your browser, so documents stay private.
        </p>
      </section>

      <section className="hub-group" aria-labelledby="pdf-tool-list">
        <h2 id="pdf-tool-list">PDF tools</h2>
        <div className="home-tools">
          {pdfTools.map((link) => (
            <Link className="home-tool-card" href={link.href} key={link.href}>
              <span className="home-tool-icon" aria-hidden="true">{link.label.split(" ")[0].slice(0, 3).toUpperCase()}</span>
              <span>
                <strong>{link.label}</strong>
                <span>{pdfToolNotes[link.href] ?? "Runs in your browser with no upload."}</span>
              </span>
              <span className="home-tool-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-group" aria-labelledby="pdf-guides">
        <h2 id="pdf-guides">PDF how-to guides</h2>
        <ul className="hub-list">
          {guideLinks
            .filter((link) => /pdf/i.test(link.label))
            .map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
        </ul>
        <p className="tool-links">
          <Link href="/guides">All guides</Link> · <Link href="/image-tools">Image tools</Link> ·{" "}
          <Link href="/compare/pdf-vs-image">PDF vs image explained</Link> · <Link href="/glossary/pdf">What is a PDF?</Link>
        </p>
      </section>

      <section className="faq-section info-panel seo-content" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently asked questions</h2>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </ToolLayout>
  );
}
