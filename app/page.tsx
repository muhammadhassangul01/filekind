import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "./components/tool-layout";
import LegacyCompressorRedirect from "./components/legacy-compressor-redirect";

export const metadata: Metadata = {
  title: "Free Image and PDF Tools | Filekind",
  description: "Choose a free browser tool to compress images, convert JPG, PNG, or WebP files, create PDFs, or render PDF pages.",
  alternates: { canonical: "/" },
};

const tools = [
  ["/compress-image", "Compress image", "Reduce an image to your chosen KB or MB limit.", "KB"],
  ["/convert-image", "Convert image", "Switch between JPG, PNG, and WebP.", "JPG"],
  ["/images-to-pdf", "Images to PDF", "Arrange your images and download them as a PDF.", "PDF"],
  ["/pdf-to-images", "PDF to images", "Turn PDF pages into JPG or PNG images.", "IMG"],
] as const;

export default function Home() {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "Filekind", url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech", description: "Free browser tools for images and PDFs." };
  return <ToolLayout active="home"><LegacyCompressorRedirect /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><section className="home-intro"><h1>Free image and PDF tools</h1><p>Choose a browser-based tool to compress images, change formats, create a PDF, or turn PDF pages into pictures. Your files are processed on your device.</p></section><section className="home-tools" aria-label="Filekind tools">{tools.map(([href, title, description, icon]) => <Link prefetch={false} className="home-tool-card" href={href} key={href}><span className="home-tool-icon" aria-hidden="true">{icon}</span><span><strong>{title}</strong><span>{description}</span></span><span className="home-tool-arrow" aria-hidden="true">-&gt;</span></Link>)}</section><p className="home-note">No signup. Limited anonymous page-view analytics help us understand which tools are useful.</p></ToolLayout>;
}
