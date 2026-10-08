import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { glossaryTerms } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Image and PDF Glossary of Terms (A to Z)",
  description:
    "Plain-language definitions of image and PDF terms: JPEG, PNG, WebP, resolution, DPI, compression, transparency, file size, and more.",
  path: "/glossary",
  keywords: [
    "image glossary",
    "file format definitions",
    "what is jpeg",
    "image terminology",
    "pdf terms",
    "resolution explained",
  ],
});

export default function GlossaryHubPage() {
  const path = "/glossary";
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  const schema = [
    webpageSchema({
      title: "Image and PDF glossary",
      description: "Plain-language definitions of image and PDF terms.",
      path,
    }),
    itemListSchema({
      name: "Filekind glossary",
      links: glossaryTerms.map((term) => ({ href: `/glossary/${term.slug}`, label: term.term })),
    }),
  ];

  return (
    <ToolLayout active="glossary">
      <JsonLd data={schema} />
      <section className="intro">
        <p className="eyebrow">Reference</p>
        <h1>Image and PDF glossary</h1>
        <p className="intro-copy">
          Short, plain definitions of the words you meet when a website rejects a photo or a form demands a specific
          format. Each term links to a full page with examples and the tool that solves the task.
        </p>
      </section>

      <section className="hub-group" aria-label="Glossary terms">
        <ul className="hub-list glossary-list">
          {sorted.map((entry) => (
            <li key={entry.slug}>
              <Link href={`/glossary/${entry.slug}`}>{entry.term}</Link>
              <p>{entry.definition}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="glossary-next">
        <h2 id="glossary-next">Put the definitions to work</h2>
        <p className="hub-blurb">
          Compression, resolution, and format choices are easier to compare side by side, and every task has a free tool
          on this site.
        </p>
        <p className="tool-links">
          <Link href="/compare">Format comparisons</Link> · <Link href="/guides">How-to guides</Link> ·{" "}
          <Link href="/compress-image">Compress an image</Link> · <Link href="/convert-image">Convert an image</Link> ·{" "}
          <Link href="/resize-image">Resize an image</Link>
        </p>
      </section>
    </ToolLayout>
  );
}
