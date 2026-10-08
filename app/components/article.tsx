import Link from "next/link";
import ToolLayout, { type NavKey } from "./tool-layout";
import JsonLd from "./json-ld";
import { ToolFaq } from "./tool-faqs";
import type { Crumb } from "@/lib/seo";
import type { ArticleSection, Faq, InternalLink } from "@/lib/content/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 220));
}

function countWords(sections: ArticleSection[], faqs: Faq[], summary: string): number {
  const parts = [summary, ...sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.list ?? [])]), ...faqs.flatMap((faq) => [faq.question, faq.answer])];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

export default function ArticlePage({
  eyebrow,
  title,
  summary,
  updated,
  crumbs,
  active,
  sections,
  faqs,
  related,
  schema,
  beforeSections,
  afterSections,
  relatedHeading = "Keep reading",
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  crumbs: Crumb[];
  active: NavKey;
  sections: ArticleSection[];
  faqs: Faq[];
  related: InternalLink[];
  schema?: Record<string, unknown>[];
  beforeSections?: React.ReactNode;
  afterSections?: React.ReactNode;
  relatedHeading?: string;
}) {
  const words = countWords(sections, faqs, summary);
  const showToc = sections.length >= 3;
  return (
    <ToolLayout active={active} breadcrumbs={crumbs}>
      <article className="article">
        {schema && schema.length > 0 && <JsonLd data={schema} />}
        <header className="article-header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="intro-copy">{summary}</p>
          <p className="article-meta">
            Updated <time dateTime={updated}>{updated}</time> · {readMinutes(words)} min read
          </p>
        </header>
        {beforeSections}
        {showToc && (
          <nav className="toc" aria-label="Table of contents">
            <p className="toc-title">On this page</p>
            <ol>
              {sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${slugify(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
              {faqs.length > 0 && (
                <li>
                  <a href="#faq-heading">Frequently asked questions</a>
                </li>
              )}
            </ol>
          </nav>
        )}
        <div className="article-body">
          {sections.map((section) => (
            <section key={section.heading} className="article-section" aria-labelledby={slugify(section.heading)}>
              <h2 id={slugify(section.heading)}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              {section.links && (
                <p className="tool-links">
                  {section.links.map((link, index) => (
                    <span key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                      {index < section.links!.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </p>
              )}
            </section>
          ))}
        </div>
        {afterSections}
        <ToolFaq faqs={faqs} />
        {related.length > 0 && (
          <section className="related" aria-labelledby="related-heading">
            <h2 id="related-heading">{relatedHeading}</h2>
            <ul>
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </ToolLayout>
  );
}
