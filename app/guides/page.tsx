import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { guideGroups, guides, guidesInGroup, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Image and PDF How-To Guides and Tutorials",
  description:
    "Step-by-step guides for compressing, converting, resizing, and printing images and PDFs, written for real upload limits on forms, emails, and apps.",
  path: "/guides",
  keywords: [
    "image guides",
    "how to compress image",
    "how to convert image",
    "pdf tutorials",
    "image size guide",
    "file format help",
  ],
});

export default function GuidesHubPage() {
  const path = "/guides";
  const schema = [
    webpageSchema({
      title: "Image and PDF how-to guides",
      description: "Step-by-step guides for compressing, converting, resizing, and printing images and PDFs.",
      path,
    }),
    itemListSchema({ name: "Filekind guides", links: guides.map((guide) => ({ href: `/guides/${guide.slug}`, label: guide.title })) }),
  ];

  return (
    <ToolLayout active="guides">
      <JsonLd data={schema} />
      <section className="intro">
        <p className="eyebrow">Learn</p>
        <h1>Image and PDF how-to guides</h1>
        <p className="intro-copy">
          Practical instructions for the tasks that actually block an upload: getting a photo under 200 KB, turning
          pictures into a PDF, changing a file format, or setting exact dimensions. Every guide uses free tools that
          run in your browser.
        </p>
      </section>

      <section className="hub-tools" aria-labelledby="guide-tools-heading">
        <h2 id="guide-tools-heading">Start with a tool</h2>
        <div className="home-tools">
          {toolLinks.slice(0, 6).map((link) => (
            <Link className="home-tool-card" href={link.href} key={link.href}>
              <span className="home-tool-icon" aria-hidden="true">
                {link.label.split(" ")[0].slice(0, 3).toUpperCase()}
              </span>
              <span>
                <strong>{link.label}</strong>
                <span>Free, private, and no signup.</span>
              </span>
              <span className="home-tool-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {guideGroups.map((group) => (
        <section className="hub-group" key={group.heading} aria-labelledby={`group-${group.slugs[0]}`}>
          <h2 id={`group-${group.slugs[0]}`}>{group.heading}</h2>
          <p className="hub-blurb">{group.blurb}</p>
          <ul className="hub-list">
            {guidesInGroup(group).map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                <p>{guide.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="hub-group" aria-labelledby="guide-related-heading">
        <h2 id="guide-related-heading">Learn the terms and formats</h2>
        <p className="hub-blurb">
          If a guide mentions a format or a limit you have not met before, the glossary and the comparisons go one level
          deeper.
        </p>
        <p className="tool-links">
          <Link href="/glossary">Image and PDF glossary</Link> · <Link href="/compare">Format comparisons</Link> ·{" "}
          <Link href="/image-tools">All image tools</Link> · <Link href="/pdf-tools">All PDF tools</Link>
        </p>
      </section>
    </ToolLayout>
  );
}
