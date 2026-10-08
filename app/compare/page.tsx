import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { comparisons } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Image Format Comparisons: JPG, PNG, WebP, PDF",
  description:
    "Side-by-side comparisons of image and document formats: JPG vs PNG, WebP vs JPG, lossy vs lossless, A4 vs Letter, and when each one wins.",
  path: "/compare",
  keywords: [
    "jpg vs png",
    "webp vs jpg",
    "png vs webp",
    "lossy vs lossless",
    "image format comparison",
    "a4 vs letter",
  ],
});

export default function CompareHubPage() {
  const path = "/compare";
  const schema = [
    webpageSchema({
      title: "Image format comparisons",
      description: "Side-by-side comparisons of image and document formats.",
      path,
    }),
    itemListSchema({
      name: "Filekind comparisons",
      links: comparisons.map((comparison) => ({ href: `/compare/${comparison.slug}`, label: comparison.title })),
    }),
  ];

  return (
    <ToolLayout active="compare">
      <JsonLd data={schema} />
      <section className="intro">
        <p className="eyebrow">Compare</p>
        <h1>Image and document format comparisons</h1>
        <p className="intro-copy">
          Every format trade-off in one place: quality, file size, transparency, support, and what each option does to
          an upload limit. Each comparison ends with a practical recommendation.
        </p>
      </section>

      <section className="hub-group" aria-label="Comparisons">
        <ul className="hub-list">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link>
              <p>{comparison.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="compare-next">
        <h2 id="compare-next">Convert once you have decided</h2>
        <p className="hub-blurb">
          Pick a format, then run the conversion or compression in your browser. Files are never uploaded.
        </p>
        <p className="tool-links">
          <Link href="/convert-image">Convert an image</Link> · <Link href="/compress-image">Compress an image</Link> ·{" "}
          <Link href="/resize-image">Resize an image</Link> · <Link href="/images-to-pdf">Build a PDF</Link> ·{" "}
          <Link href="/guides">How-to guides</Link>
        </p>
      </section>
    </ToolLayout>
  );
}
