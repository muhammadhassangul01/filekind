import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "../../components/article";
import { getTerm, glossaryTerms } from "@/lib/content";
import { definedTermSchema, pageMetadata, webpageSchema } from "@/lib/seo";

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const entry = getTerm((await params).slug);
  if (!entry) return { robots: { index: false } };
  return pageMetadata({
    title: entry.metaTitle,
    description: entry.description,
    path: `/glossary/${entry.slug}`,
    keywords: entry.keywords,
    type: "article",
    modifiedTime: entry.updated,
  });
}

export default async function GlossaryEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getTerm((await params).slug);
  if (!entry) notFound();

  const path = `/glossary/${entry.slug}`;
  const schema = [
    definedTermSchema({ term: entry.term, definition: entry.definition, path }),
    webpageSchema({ title: entry.title, description: entry.description, path, updated: entry.updated }),
  ];

  return (
    <ArticlePage
      eyebrow="Glossary"
      title={entry.title}
      summary={entry.summary}
      updated={entry.updated}
      crumbs={[{ name: "Home", href: "/" }, { name: "Glossary", href: "/glossary" }, { name: entry.term }]}
      active="glossary"
      sections={entry.sections}
      faqs={entry.faqs}
      related={entry.related}
      schema={schema}
      beforeSections={
        <p className="definition-box">
          <strong>{entry.term}:</strong> {entry.definition}
        </p>
      }
      relatedHeading="Related terms and tools"
    />
  );
}
