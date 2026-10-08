import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "../../components/article";
import { getGuide, guides } from "@/lib/content";
import { articleSchema, howToSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return { robots: { index: false } };
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    type: "article",
    publishedTime: guide.updated,
    modifiedTime: guide.updated,
  });
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const schema = [
    articleSchema({
      title: guide.title,
      description: guide.description,
      path,
      updated: guide.updated,
      section: "Guides",
    }),
    ...(guide.kind === "howto" && guide.steps?.length
      ? [
          howToSchema({
            name: guide.title,
            description: guide.summary,
            path,
            steps: guide.steps,
            updated: guide.updated,
          }),
        ]
      : []),
  ];

  return (
    <ArticlePage
      eyebrow={guide.kind === "howto" ? "Step-by-step guide" : guide.kind === "usecase" ? "Practical guide" : "Guide"}
      title={guide.title}
      summary={guide.summary}
      updated={guide.updated}
      crumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }, { name: guide.title }]}
      active="guides"
      sections={guide.sections}
      faqs={guide.faqs}
      related={guide.related}
      schema={schema}
      relatedHeading="Related guides and tools"
    />
  );
}
