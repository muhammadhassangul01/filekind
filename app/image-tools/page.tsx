import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { converterLinks, guideLinks, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";

const faqs = [
  {
    question: "Are these image tools free?",
    answer:
      "Yes. Every tool on Filekind is free with no signup, no watermark, and no daily limit. They run in the browser, so there is nothing to install.",
  },
  {
    question: "Do I have to upload my photos?",
    answer:
      "No. Images are read and processed on your device with JavaScript. Your files are never sent to a server, which also means the tools keep working with private or sensitive pictures.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "JPEG, PNG, and static WebP. You can convert between all six combinations, compress JPEG and PNG, resize any of them, and place them into a PDF.",
  },
  {
    question: "What are the limits?",
    answer:
      "Images are limited to 25 MB, 16,000 pixels per side, and 48 megapixels. Those limits keep unusually large photos bounded while still covering high-resolution cameras.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Online Image Tools: Compress, Convert, Resize",
  description:
    "Free browser-based image tools: compress to a KB limit, resize to exact pixels, convert JPG, PNG, and WebP, and build PDFs. No upload, no signup.",
  path: "/image-tools",
  keywords: [
    "online image tools",
    "image tools",
    "free image compressor",
    "online image converter",
    "image resizer online",
    "photo tools free",
    "browser image editor tools",
  ],
});

export default function ImageToolsHubPage() {
  const path = "/image-tools";
  const schema = [
    webpageSchema({
      title: "Online image tools",
      description: "Free browser-based tools to compress, convert, resize, and package images.",
      path,
    }),
    itemListSchema({
      name: "Filekind image tools",
      links: [...toolLinks.filter((link) => !link.href.includes("pdf-to") && link.href !== "/jpg-to-pdf" && link.href !== "/png-to-pdf" && link.href !== "/webp-to-pdf"), ...converterLinks],
    }),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
  ];

  return (
    <ToolLayout active="info" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Image tools" }]}>
      <JsonLd data={schema} />
      <section className="intro">
        <p className="eyebrow">Toolkit</p>
        <h1>Online image tools that run in your browser</h1>
        <p className="intro-copy">
          Compress a photo to a specific KB limit, resize it to exact pixels, switch between JPG, PNG, and WebP, or
          arrange pictures into a PDF. Nothing is uploaded, nothing is stored, and every tool is free.
        </p>
      </section>

      <section className="hub-group" aria-labelledby="core-image-tools">
        <h2 id="core-image-tools">Core image tools</h2>
        <div className="home-tools">
          {[
            { href: "/compress-image", title: "Compress image", description: "Reduce a JPEG or PNG to a custom KB or MB limit." },
            { href: "/resize-image", title: "Resize image", description: "Set exact pixels or a percentage with the ratio locked." },
            { href: "/convert-image", title: "Convert image", description: "Switch between JPG, PNG, and static WebP." },
            { href: "/images-to-pdf", title: "Images to PDF", description: "Turn a set of photos into one document." },
          ].map((tool) => (
            <Link className="home-tool-card" href={tool.href} key={tool.href}>
              <span className="home-tool-icon" aria-hidden="true">{tool.title.split(" ")[0].slice(0, 3).toUpperCase()}</span>
              <span>
                <strong>{tool.title}</strong>
                <span>{tool.description}</span>
              </span>
              <span className="home-tool-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-group" aria-labelledby="converter-tools">
        <h2 id="converter-tools">Converters for every format pair</h2>
        <p className="hub-blurb">Each converter fixes the input and output format, so there is nothing to configure.</p>
        <p className="tool-links">
          {converterLinks.map((link, index) => (
            <span key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {index < converterLinks.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <section className="hub-group" aria-labelledby="image-tasks">
        <h2 id="image-tasks">Start from the task</h2>
        <ul className="hub-list">
          {guideLinks.slice(0, 8).map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <p className="tool-links">
          <Link href="/guides">All guides</Link> · <Link href="/compare">Format comparisons</Link> ·{" "}
          <Link href="/glossary">Glossary</Link> · <Link href="/pdf-tools">PDF tools</Link>
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
