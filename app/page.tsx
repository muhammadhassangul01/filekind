import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "./components/tool-layout";
import LegacyCompressorRedirect from "./components/legacy-compressor-redirect";

export const metadata: Metadata = {
  title: "Simple tools for images and PDFs",
  description: "Compress images, change formats, and convert PDFs. Your files stay on your device.",
  alternates: { canonical: "/" },
};

const tools = [
  ["/compress-image", "Compress image", "Reduce an image to your chosen KB or MB limit.", "KB"],
  ["/convert-image", "Convert image", "Switch between JPG, PNG, and WebP.", "JPG"],
  ["/images-to-pdf", "Images to PDF", "Arrange your images and download them as a PDF.", "PDF"],
  ["/pdf-to-images", "PDF to images", "Turn PDF pages into JPG or PNG images.", "IMG"],
] as const;

export default function Home() {
  return <ToolLayout active="home"><LegacyCompressorRedirect /><section className="home-intro"><h1>Simple tools for images and PDFs</h1><p>Compress images, change formats, and convert PDFs. Your files stay on your device.</p></section><section className="home-tools" aria-label="Filekind tools">{tools.map(([href, title, description, icon]) => <Link prefetch={false} className="home-tool-card" href={href} key={href}><span className="home-tool-icon" aria-hidden="true">{icon}</span><span><strong>{title}</strong><span>{description}</span></span><span className="home-tool-arrow" aria-hidden="true">-&gt;</span></Link>)}</section><p className="home-note">No signup. File processing happens in your browser.</p></ToolLayout>;
}
