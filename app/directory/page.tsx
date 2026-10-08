import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { comparisons, converterLinks, glossaryLinks, guideLinks, hubLinks, toolLinks } from "@/lib/content";
import { itemListSchema, pageMetadata, webpageSchema } from "@/lib/seo";

const companyLinks = [
  { href: "/about", label: "About Filekind" },
  { href: "/privacy", label: "Privacy" },
];

export const metadata: Metadata = pageMetadata({
  title: "Site Directory: Every Page on Filekind",
  description:
    "A complete index of Filekind: every image and PDF tool, converter, guide, glossary term, and comparison on one page for people and crawlers.",
  path: "/directory",
  keywords: ["site directory", "all tools", "filekind index", "html sitemap"],
});

export default function DirectoryPage() {
  const path = "/directory";
  const schema = [
    webpageSchema({
      title: "Filekind site directory",
      description: "A complete index of every page on Filekind.",
      path,
    }),
    itemListSchema({
      name: "Filekind directory",
      links: [
        ...toolLinks,
        ...converterLinks,
        ...hubLinks,
        ...guideLinks,
        ...glossaryLinks,
        ...comparisonLinksSafe(),
        ...companyLinks,
      ],
    }),
  ];

  return (
    <ToolLayout active="directory" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Site directory" }]}>
      <JsonLd data={schema} />
      <section className="intro">
        <p className="eyebrow">Index</p>
        <h1>Site directory</h1>
        <p className="intro-copy">
          Every tool, converter, guide, glossary term, and comparison on Filekind, collected on one page for quick
          navigation and for search engines that crawl a full index.
        </p>
      </section>

      <section className="hub-group" aria-labelledby="dir-tools">
        <h2 id="dir-tools">Tools</h2>
        <ul className="hub-list directory-list">
          {toolLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="dir-converters">
        <h2 id="dir-converters">Converters</h2>
        <ul className="hub-list directory-list">
          {converterLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="dir-hubs">
        <h2 id="dir-hubs">Collections</h2>
        <ul className="hub-list directory-list">
          {hubLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          {companyLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="dir-guides">
        <h2 id="dir-guides">Guides</h2>
        <ul className="hub-list directory-list">
          {guideLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="dir-comparisons">
        <h2 id="dir-comparisons">Comparisons</h2>
        <ul className="hub-list directory-list">
          {comparisonLinksSafe().map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-group" aria-labelledby="dir-glossary">
        <h2 id="dir-glossary">Glossary</h2>
        <ul className="hub-list directory-list">
          {glossaryLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </ToolLayout>
  );
}

function comparisonLinksSafe() {
  return comparisons.map((comparison) => ({
    href: `/compare/${comparison.slug}`,
    label: `${comparison.a} vs ${comparison.b}`,
  }));
}
