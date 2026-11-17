import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { converterLinks, guideLinks, toolLinks } from "@/lib/content";
import { extraTools } from "@/lib/extra-tools";
import ToolIcon from "../components/tool-icon";
import FormatPairIcon from "../components/format-pair-icon";
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
      "There is no artificial file-size limit. Images over 2,000,000 pixels on either side are rejected because browser canvases cannot safely process them.",
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
      links: [...toolLinks.filter((link) => ["/compress-image", "/resize-image", "/convert-image", "/images-to-pdf", ...extraTools.map((tool) => `/${tool.path}`)].includes(link.href)), ...converterLinks],
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
      </section>

      <section className="hub-group" aria-labelledby="core-image-tools">
        <h2 id="core-image-tools">Core image tools</h2>
        <div className="home-tools">
          {[
            { href: "/compress-image", title: "Compress image", description: "Reduce a JPEG or PNG to a custom KB or MB limit." },
            { href: "/resize-image", title: "Resize image", description: "Set exact pixels or a percentage with the ratio locked." },
            { href: "/convert-image", title: "Convert image", description: "Switch between JPG, PNG, and static WebP." },
            { href: "/images-to-pdf", title: "Images to PDF", description: "Turn a set of photos into one document." },
            ...extraTools.map((tool) => ({ href: `/${tool.path}`, title: tool.label, description: tool.description })),
          ].map((tool) => (
            <Link className="home-tool-card" href={tool.href} key={tool.href}>
              <ToolIcon href={tool.href} />
              <span>
                <strong>{tool.title}</strong>
              </span>
              <span className="home-tool-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-group" aria-labelledby="converter-tools">
        <h2 id="converter-tools">Converters for every format pair</h2>
        <div className="format-pair-grid">
          {converterLinks.map((link) => {
            const [from, to] = link.label.split(" to ");
            return <FormatPairIcon href={link.href} from={from} to={to} key={link.href} />;
          })}
        </div>
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
