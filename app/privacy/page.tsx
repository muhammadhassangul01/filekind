import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { pageMetadata, webpageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy: Your Files Never Leave Your Device",
  description:
    "Filekind processes files in your browser and stores only limited anonymous page and click counts. Read what is and is not collected.",
  path: "/privacy",
  keywords: ["filekind privacy", "image tool privacy", "no upload image converter", "data policy"],
});

export default function PrivacyPage() {
  const path = "/privacy";
  const updated = "2026-10-08";
  return (
    <ToolLayout active="info" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Privacy" }]}>
      <JsonLd
        data={[
          webpageSchema({
            title: "Privacy policy",
            description: "How Filekind handles files and limited anonymous analytics.",
            path,
            updated,
          }),
        ]}
      />
      <article className="article">
        <header className="article-header">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy policy</h1>
          <p className="intro-copy">
            Your files are processed in your browser and are never uploaded. This page explains the only data that is
            recorded, which is limited anonymous usage counting.
          </p>
          <p className="article-meta">
            Last updated <time dateTime={updated}>{updated}</time>
          </p>
        </header>

        <div className="article-body">
          <section className="article-section" aria-labelledby="files">
            <h2 id="files">Your files stay on your device</h2>
            <p>
              Images and PDFs you choose are read directly in your browser tab. Decoding, resizing, compressing,
              converting, and PDF assembly all happen locally, and the result is offered as a download. No image, PDF,
              filename, or file content is transmitted to Filekind, because there is no upload endpoint for them.
            </p>
            <p>
              When you close or reload the tab, the working copies held in memory are discarded. Filekind has no
              accounts, no cloud storage, and no file history.
            </p>
          </section>

          <section className="article-section" aria-labelledby="analytics">
            <h2 id="analytics">Limited anonymous analytics</h2>
            <p>
              To learn which tools are useful, Filekind sends a small usage event for a limited set of public pages:
              the normalised page path and, for a subset of pages, a normalised button or link label. Events are
              grouped by UTC day and by country in aggregate.
            </p>
            <ul>
              <li>No cookies are set and no advertising or tracking scripts are loaded.</li>
              <li>Raw IP addresses, filenames, file contents, query strings, and fingerprints are not stored.</li>
              <li>No persistent visitor identifiers are created, so counts are page events rather than unique people.</li>
              <li>Aggregate rows are kept for 90 days and are then deleted.</li>
            </ul>
            <p>
              Because the data is aggregate, it cannot be used to identify you, and it is never sold or shared with
              advertisers.
            </p>
          </section>

          <section className="article-section" aria-labelledby="hosting">
            <h2 id="hosting">Hosting and delivery</h2>
            <p>
              The site is delivered as static files through Cloudflare Pages, and usage events are handled by a
              Cloudflare Worker. Like any host, Cloudflare processes standard request data to deliver and secure the
              site under its own terms. That data never includes your image or PDF files, which are never requested by
              the server.
            </p>
          </section>

          <section className="article-section" aria-labelledby="third-parties">
            <h2 id="third-parties">Third parties</h2>
            <p>
              Filekind loads no third-party analytics, ads, social widgets, or external fonts. The only network
              requests the site makes are for its own pages and, optionally, the anonymous usage endpoint described
              above.
            </p>
          </section>

          <section className="article-section" aria-labelledby="choices">
            <h2 id="choices">Your choices</h2>
            <p>
              You can block the optional usage endpoint in your browser, use the site in private browsing, or simply
              turn JavaScript off for the analytics endpoint. Every tool still works locally when analytics is
              blocked, because processing never depends on the network.
            </p>
            <p className="tool-links">
              <Link href="/about">About Filekind</Link> · <Link href="/directory">Site directory</Link> ·{" "}
              <a href="https://github.com/muhammadhassangul01/filekind/issues">Questions or feedback</a>
            </p>
          </section>

          <section className="article-section" aria-labelledby="changes">
            <h2 id="changes">Changes to this policy</h2>
            <p>
              If the measurement practice changes, this page will be updated with a new date at the top. Continued use
              of the site after an update means you accept the revised policy.
            </p>
          </section>
        </div>
      </article>
    </ToolLayout>
  );
}
