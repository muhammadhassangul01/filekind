import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "../components/tool-layout";
import JsonLd from "../components/json-ld";
import { pageMetadata, webpageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Filekind: Free Browser Image and PDF Tools",
  description:
    "Filekind is a free, browser-based set of image and PDF tools. No accounts, no uploads, no watermarks: files are processed on your device.",
  path: "/about",
  keywords: ["about filekind", "free image tools", "browser image tools", "no upload image converter"],
});

export default function AboutPage() {
  const path = "/about";
  return (
    <ToolLayout active="info" breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}>
      <JsonLd
        data={[
          webpageSchema({
            title: "About Filekind",
            description: "Filekind is a free, browser-based set of image and PDF tools.",
            path,
          }),
        ]}
      />
      <article className="article">
        <header className="article-header">
          <p className="eyebrow">About</p>
          <h1>About Filekind</h1>
          <p className="intro-copy">
            Filekind is a small set of free image and PDF tools that run entirely in your browser. The goal is simple:
            the task you came for should finish in seconds, without an account, a watermark, or an upload.
          </p>
        </header>

        <div className="article-body">
          <section className="article-section" aria-labelledby="what-it-does">
            <h2 id="what-it-does">What Filekind does</h2>
            <p>
              Compress a photo to a target KB or MB size, resize it to exact pixels, convert between JPG, PNG, and
              static WebP, place images onto PDF pages, and render PDF pages back out as JPG or PNG images. Each tool
              is focused on one job rather than a full editing suite.
            </p>
            <p className="tool-links">
              <Link href="/image-tools">All image tools</Link> · <Link href="/pdf-tools">All PDF tools</Link> ·{" "}
              <Link href="/guides">How-to guides</Link>
            </p>
          </section>

          <section className="article-section" aria-labelledby="how-it-works">
            <h2 id="how-it-works">How it works</h2>
            <p>
              Your file is read with JavaScript on your own device. Decoding, scaling, encoding, and PDF assembly all
              happen in the browser tab, and the result is offered to you as a download. The original file is never
              sent to a server, because there is no upload step at all.
            </p>
            <p>
              That design has two consequences worth knowing. First, private documents and photos stay private.
              Second, very large files depend on your device memory, which is why the site publishes conservative
              limits: 25 MB and 16,000 pixels per side for images, 50 MB and 100 pages for PDFs.
            </p>
          </section>

          <section className="article-section" aria-labelledby="what-it-does-not">
            <h2 id="what-it-does-not">What Filekind does not do</h2>
            <p>Honesty about scope matters more than a long feature list:</p>
            <ul>
              <li>No HEIC, GIF, BMP, TIFF, SVG, or AVIF conversion.</li>
              <li>No OCR, PDF editing, or compression of an existing PDF.</li>
              <li>No cropping, rotating, watermarking, or batch processing across many files.</li>
              <li>No accounts, cloud storage, or file history.</li>
            </ul>
            <p className="tool-links">
              <Link href="/compare/online-tools-vs-desktop-apps">Online tools vs desktop software</Link> ·{" "}
              <Link href="/glossary">Glossary of image terms</Link>
            </p>
          </section>

          <section className="article-section" aria-labelledby="open-source">
            <h2 id="open-source">Source code and feedback</h2>
            <p>
              Filekind is built with Next.js as a static site and is published from a public GitHub repository. Bug
              reports and suggestions are welcome in the repository issues.
            </p>
            <p className="tool-links">
              <a href="https://github.com/muhammadhassangul01/filekind">GitHub repository</a> ·{" "}
              <Link href="/privacy">Privacy policy</Link>
            </p>
          </section>
        </div>
      </article>
    </ToolLayout>
  );
}
