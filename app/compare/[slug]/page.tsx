import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticlePage from "../../components/article";
import { comparisons, getComparison } from "@/lib/content";
import { articleSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const comparison = getComparison((await params).slug);
  if (!comparison) return { robots: { index: false } };
  return pageMetadata({
    title: comparison.metaTitle,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
    keywords: comparison.keywords,
    type: "article",
    modifiedTime: comparison.updated,
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const comparison = getComparison((await params).slug);
  if (!comparison) notFound();

  const path = `/compare/${comparison.slug}`;
  const schema = [
    articleSchema({
      title: comparison.title,
      description: comparison.description,
      path,
      updated: comparison.updated,
      section: "Comparisons",
    }),
  ];

  return (
    <ArticlePage
      eyebrow="Comparison"
      title={comparison.title}
      summary={comparison.summary}
      updated={comparison.updated}
      crumbs={[{ name: "Home", href: "/" }, { name: "Comparisons", href: "/compare" }, { name: `${comparison.a} vs ${comparison.b}` }]}
      active="compare"
      sections={comparison.sections}
      faqs={comparison.faqs}
      related={comparison.related}
      schema={schema}
      beforeSections={
        <div className="table-wrap">
          <table className="compare-table">
            <caption className="visually-hidden">
              {comparison.a} compared with {comparison.b}
            </caption>
            <thead>
              <tr>
                <th scope="col">Aspect</th>
                <th scope="col">{comparison.a}</th>
                <th scope="col">{comparison.b}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.aspect}>
                  <th scope="row">{row.aspect}</th>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      afterSections={
        <section className="verdict" aria-labelledby="verdict-heading">
          <h2 id="verdict-heading">Verdict</h2>
          <p>{comparison.verdict}</p>
          <p className="tool-links">
            <Link href={comparison.tool.href}>{comparison.tool.label}</Link> ·{" "}
            <Link href="/compare">See all comparisons</Link>
          </p>
        </section>
      }
      relatedHeading="Related comparisons and tools"
    />
  );
}
