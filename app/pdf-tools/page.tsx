import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { guideLinks, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";
import ToolIcon from "../components/tool-icon";

const pdfTools = toolLinks.filter((link) =>
  ["/images-to-pdf", "/pdf-to-images", "/merge-pdf", "/split-pdf", "/compress-pdf", "/rotate-pdf"].includes(link.href),
);

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
      "Large PDFs are processed locally where your browser has enough memory. Very large documents or unusually long files may still be limited by the device running the tool.",
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
      </section>

      <section className="hub-group" aria-labelledby="pdf-tool-list">
        <h2 id="pdf-tool-list">PDF tools</h2>
        <div className="home-tools">
          {pdfTools.map((link) => (
            <Link className="home-tool-card" href={link.href} key={link.href}>
              <ToolIcon href={link.href} />
              <span>
                <strong>{link.label}</strong>
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
