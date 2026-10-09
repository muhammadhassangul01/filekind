import Link from "next/link";
import ToolLayout from "./components/tool-layout";
import { converterLinks, guideLinks, toolLinks } from "@/lib/content";

export default function NotFound() {
  return (
    <ToolLayout active="info" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Page not found" }]}>
      <section className="intro">
        <p className="eyebrow">404</p>
        <h1>That page does not exist</h1>
        <p className="intro-copy">
          The address may be mistyped or the page may have moved. Every tool and guide is still reachable from the
          lists below.
        </p>
      </section>

      <section className="home-tools" aria-label="Filekind tools">
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
      </section>

      <section className="home-section" aria-labelledby="not-found-links">
        <h2 id="not-found-links">Browse the site</h2>
        <p className="tool-links">
          {converterLinks.slice(0, 4).map((link, index) => (
            <span key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {index < 3 ? " · " : ""}
            </span>
          ))}
        </p>
        <p className="tool-links">
          <Link href="/guides">Guides</Link> · <Link href="/glossary">Glossary</Link> ·{" "}
          <Link href="/compare">Comparisons</Link> · <Link href="/image-tools">Image tools</Link> ·{" "}
          <Link href="/pdf-tools">PDF tools</Link> · <Link href="/directory">Site directory</Link>
        </p>
        <p className="tool-links">
          {guideLinks.slice(0, 6).map((link, index) => (
            <span key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {index < 5 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>
    </ToolLayout>
  );
}
