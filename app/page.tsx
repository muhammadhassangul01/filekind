import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "./components/tool-layout";
import LegacyCompressorRedirect from "./components/legacy-compressor-redirect";
import JsonLd from "./components/json-ld";
import { converterLinks, guideLinks, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description:
    "Free browser tools to compress images to a KB limit, resize to exact pixels, convert JPG, PNG, and WebP, and build PDFs. No upload, no signup, no watermark.",
  path: "/",
  keywords: [
    "free image tools",
    "image compressor online",
    "convert image online",
    "image to pdf",
    "pdf to images",
    "resize image online",
    "browser image tools",
  ],
});

const mainTools = toolLinks.slice(0, 6);

const toolSummaries: Record<string, string> = {
  "/compress-image": "Reduce a JPEG or PNG to a custom KB or MB limit.",
  "/resize-image": "Set exact pixels or a percentage with the ratio locked.",
  "/convert-image": "Switch between JPG, PNG, and static WebP.",
  "/images-to-pdf": "Arrange your images and download them as a PDF.",
  "/pdf-to-images": "Turn PDF pages into JPG or PNG images.",
  "/merge-pdf": "Join separate PDFs in the order you choose.",
};

const featureCards = [
  {
    href: "/images-to-pdf",
    eyebrow: "Photos \u2192 Document",
    title: "Photos to PDF",
    description: "Turn receipts, notes, and snapshots into a PDF that\u2019s easy to send.",
    meta: "JPEG, PNG, WebP & HEIC",
    cta: "Convert photos",
  },
  {
    href: "/merge-pdf",
    eyebrow: "Documents \u2192 One file",
    title: "Merge PDF",
    description: "Combine separate PDFs in the right order. One document, ready to share.",
    meta: "Up to 20 PDFs \u00b7 Keep original page quality",
    cta: "Merge PDFs",
  },
  {
    href: "/split-pdf",
    eyebrow: "One file \u2192 Your pages",
    title: "Split PDF",
    description: "Save selected pages or divide a document into smaller PDFs.",
    meta: "Page previews \u00b7 Ranges or individual pages",
    cta: "Split a PDF",
  },
  {
    href: "/compress-pdf",
    eyebrow: "Same document \u2192 Less space",
    title: "Compress PDF",
    description: "Make image-heavy PDFs smaller and easier to send, with a quality level you choose.",
    meta: "Three compression levels \u00b7 Text stays selectable",
    cta: "Compress a PDF",
  },
  {
    href: "/rotate-pdf",
    eyebrow: "Sideways \u2192 Right way",
    title: "Rotate PDF",
    description: "Turn selected pages and save a document that\u2019s comfortable to read.",
    meta: "Rotate left or right \u00b7 Keep original quality",
    cta: "Rotate pages",
  },
  {
    href: "/pdf-to-images",
    eyebrow: "Document \u2192 Images",
    title: "PDF to images",
    description: "Save PDF pages as pictures for presentations, sharing, and more.",
    meta: "PNG or JPEG \u00b7 Individual images or ZIP",
    cta: "Save images",
  },
];

const taskLinks = guideLinks.slice(0, 8);

const homeFaqs = [
  {
    question: "Is Filekind free to use?",
    answer:
      "Yes. Every tool is free with no signup, no watermark, and no usage counter. The tools run in your browser, so there is no account system at all.",
  },
  {
    question: "Do you upload my images or PDFs?",
    answer:
      "No. Files are read and processed on your device with JavaScript. Nothing is sent to a server, which means private documents stay private and the tools keep working offline after the page has loaded.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "Images: JPEG, PNG, and static WebP, convertible in all six directions, plus HEIC photos when you build a PDF. PDFs can be created from images and rendered back to JPG or PNG pages.",
  },
  {
    question: "What can I do with a photo that is too large?",
    answer:
      "Compress it to a target KB or MB size, or resize it to smaller pixel dimensions. Both change the file size, and both are covered by step-by-step guides on the site.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. A modern browser is enough on desktop or phone. There is no software to install, no extension, and no file limit tied to a subscription.",
  },
];

export default function Home() {
  const schema = [
    itemListSchema({ name: "Filekind tools", links: toolLinks }),
    itemListSchema({ name: "Popular Filekind guides", links: taskLinks }),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <ToolLayout active="home">
      <LegacyCompressorRedirect />
      <JsonLd data={schema} />
      <section className="home-intro">
        <h1>Free image and PDF tools</h1>
        <p>
          Compress a photo to an exact KB limit, resize it to the pixels a form asks for, convert between JPG, PNG, and
          WebP, or turn pictures into a PDF and back again. Every tool runs in your browser, so your files are never
          uploaded.
        </p>
      </section>

      <section className="home-tools" aria-label="Filekind tools">
        {mainTools.map((link) => (
          <Link className="home-tool-card" href={link.href} key={link.href}>
            <span className="home-tool-icon" aria-hidden="true">
              {link.label.split(" ")[0].slice(0, 3).toUpperCase()}
            </span>
            <span>
              <strong>{link.label}</strong>
              <span>{toolSummaries[link.href] ?? "Runs in your browser with no upload."}</span>
            </span>
            <span className="home-tool-arrow" aria-hidden="true">
              -&gt;
            </span>
          </Link>
        ))}
      </section>

      <section className="home-section" aria-labelledby="home-featured">
        <h2 id="home-featured">Everyday document tasks</h2>
        <p>Six tasks people arrive with, each one handled by a tool that keeps your files on this device.</p>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <Link className="feature-card" href={card.href} key={card.href}>
              <span className="feature-eyebrow">{card.eyebrow}</span>
              <strong className="feature-title">{card.title}</strong>
              <span className="feature-description">{card.description}</span>
              <span className="feature-meta">{card.meta}</span>
              <span className="feature-cta">
                {card.cta}
                <i aria-hidden="true">↗</i>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-converters">
        <h2 id="home-converters">Convert any format pair</h2>
        <p className="tool-links">
          {converterLinks.map((link, index) => (
            <span key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {index < converterLinks.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <section className="home-section" aria-labelledby="home-tasks">
        <h2 id="home-tasks">Start from your task</h2>
        <ul className="home-task-list">
          {taskLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <p className="tool-links">
          <Link href="/guides">All guides</Link> · <Link href="/image-tools">All image tools</Link> ·{" "}
          <Link href="/pdf-tools">All PDF tools</Link> · <Link href="/compare">Format comparisons</Link> ·{" "}
          <Link href="/glossary">Glossary</Link>
        </p>
      </section>

      <section className="home-section" aria-labelledby="home-limits">
        <h2 id="home-limits">What is supported</h2>
        <p>
          Images up to 25 MB, 16,000 pixels per side, and 48 megapixels. PDFs up to 50 MB and 100 pages. JPEG, PNG, and
          static WebP are supported for conversion, compression, resizing, and PDF creation. Animated WebP and
          password-protected PDFs are rejected rather than handled incorrectly.
        </p>
        <p className="tool-links">
          <Link href="/about">About Filekind</Link> · <Link href="/privacy">Privacy</Link> ·{" "}
          <Link href="/directory">Site directory</Link>
        </p>
      </section>

      <section className="faq-section info-panel seo-content" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently asked questions</h2>
        {homeFaqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p className="home-note">
        No signup. Limited anonymous page-view analytics help us understand which tools are useful.
      </p>
    </ToolLayout>
  );
}
