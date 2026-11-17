import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "./components/tool-layout";
import LegacyCompressorRedirect from "./components/legacy-compressor-redirect";
import JsonLd from "./components/json-ld";
import { converterLinks, guideLinks, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata } from "@/lib/seo";
import ToolIcon from "./components/tool-icon";
import FormatPairIcon from "./components/format-pair-icon";

export const metadata: Metadata = pageMetadata({
  description:
    "Compress images to a KB limit, resize to exact pixels, convert JPG, PNG, and WebP, and create PDFs with free online tools. Your files stay on your device.",
  path: "/",
  keywords: [
    "free image tools",
    "image compressor online",
    "compress image to 200kb",
    "convert image online",
    "JPG to PNG converter",
    "image to pdf",
    "pdf to images",
    "resize image online",
    "resize image to exact pixels",
    "free PDF tools",
    "browser image tools",
  ],
});

const mainTools = toolLinks.slice(0, 9);

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
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow"><span className="hero-status-dot" /> Private file tools, right in your browser</p>
          <h1>Free image and PDF tools.<br /><span>Ready when you are.</span></h1>
          <p className="home-hero-description">
            Compress, convert, resize, and manage PDFs privately in your browser. No uploads, signup, or watermark.
          </p>
          <div className="home-hero-actions">
            <Link className="primary-button hero-primary-cta" href="/image-tools">Explore image tools <span aria-hidden="true">→</span></Link>
            <Link className="hero-secondary-cta" href="/pdf-tools">Explore PDF tools <span aria-hidden="true">↗</span></Link>
          </div>
          <ul className="home-trust-list" aria-label="Filekind benefits">
            <li><span aria-hidden="true">✓</span> Files stay on your device</li>
            <li><span aria-hidden="true">✓</span> Free, with no signup</li>
            <li><span aria-hidden="true">✓</span> Works on desktop and mobile</li>
          </ul>
        </div>
        <div className="home-hero-visual" aria-hidden="true">
          <div className="hero-window">
            <div className="hero-window-bar"><span /><span /><span /><strong>Filekind workspace</strong></div>
            <div className="hero-window-content">
              <div className="hero-privacy-badge"><span /> Your files never leave this device</div>
              <div className="hero-flow-row">
                <span className="hero-flow-icon hero-file-icon">JPG</span>
                <div><small>STEP 01</small><strong>Choose a file</strong><span>From your device</span></div>
                <i>↘</i>
              </div>
              <div className="hero-flow-row">
                <span className="hero-flow-icon hero-process-icon">✳</span>
                <div><small>STEP 02</small><strong>Make it fit</strong><span>Adjust size or format</span></div>
                <i>↘</i>
              </div>
              <div className="hero-flow-row hero-flow-last">
                <span className="hero-flow-icon hero-ready-icon">✓</span>
                <div><small>STEP 03</small><strong>Save your result</strong><span>Downloaded to your device</span></div>
              </div>
              <div className="hero-local-note"><span>●</span> Processed locally in your browser</div>
            </div>
          </div>
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
        </div>
      </section>

      <section className="home-tool-section" aria-labelledby="home-tools-title">
        <div className="home-section-heading">
          <div><p className="eyebrow">The essentials · 9 core tools</p><h2 id="home-tools-title">Everything you need to fix a file</h2></div>
          <Link href="/image-tools" className="home-view-all">All tools <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-tools" aria-label="Filekind tools">
        {mainTools.map((link) => (
          <Link className="home-tool-card" href={link.href} key={link.href}>
            <ToolIcon href={link.href} />
            <span>
              <strong>{link.label}</strong>
            </span>
            <span className="home-tool-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </section>

      <section className="home-proof" aria-label="Why use Filekind">
        <div><strong>100%</strong><span>in your browser</span></div>
        <div><strong>0 uploads</strong><span>your files stay private</span></div>
        <div><strong>Free</strong><span>no account or watermark</span></div>
      </section>

      <section className="home-section" aria-labelledby="home-featured">
        <p className="eyebrow">Made for everyday work</p>
        <h2 id="home-featured">Popular workflows</h2>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <Link className="feature-card" href={card.href} key={card.href}>
              <ToolIcon href={card.href} />
              <strong className="feature-title">{card.title}</strong>
              <span className="feature-cta" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-converters">
        <p className="eyebrow">Quick conversions</p>
        <h2 id="home-converters">Convert JPG, PNG, and WebP</h2>
        <div className="format-pair-grid">
          {converterLinks.map((link) => {
            const [from, to] = link.label.split(" to ");
            return <FormatPairIcon href={link.href} from={from} to={to} key={link.href} />;
          })}
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-tasks">
        <p className="eyebrow">Guides and use cases</p>
        <h2 id="home-tasks">Need help choosing?</h2>
        <ul className="home-task-list">
          {taskLinks.slice(0, 4).map((link) => (
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

      <section className="home-section home-privacy" aria-labelledby="home-limits">
        <p className="eyebrow">Private by default</p>
        <h2 id="home-limits">Your files stay on your device</h2>
        <p className="tool-links">
          <Link href="/about">How it works</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/directory">All pages</Link>
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
        No signup. Anonymous, aggregate usage counts help us improve the tools; no file data is ever collected.
      </p>
    </ToolLayout>
  );
}
