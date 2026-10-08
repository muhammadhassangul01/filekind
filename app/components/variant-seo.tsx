import Link from "next/link";

export default function VariantSeo({
  heading,
  paragraphs,
  list,
  related,
}: {
  heading: string;
  paragraphs: string[];
  list?: string[];
  related?: { href: string; label: string }[];
}) {
  return (
    <section className="info-panel seo-content" aria-labelledby="variant-guide">
      <h2 id="variant-guide">{heading}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {list && (
        <ol>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
      {related && (
        <p className="tool-links">
          Related:{" "}
          {related.map((link, index) => (
            <span key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {index < related.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
