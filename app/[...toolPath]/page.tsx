import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompressPdf from "@/app/components/compress-pdf";
import ImageCompressor from "@/app/components/image-compressor";
import ImageConverter from "@/app/components/image-converter";
import ImagesToPdf from "@/app/components/images-to-pdf";
import JsonLd from "@/app/components/json-ld";
import MergePdf from "@/app/components/merge-pdf";
import PdfToImages from "@/app/components/pdf-to-images";
import ResizeImage from "@/app/components/resize-image";
import RotatePdf from "@/app/components/rotate-pdf";
import SplitPdf from "@/app/components/split-pdf";
import { getNicheToolByPath, nicheTools, type NicheTool } from "@/lib/niche-tools";
import { absoluteUrl, faqSchema, pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return nicheTools.map((tool) => ({ toolPath: tool.path }));
}

export async function generateMetadata({ params }: { params: Promise<{ toolPath: string[] }> }): Promise<Metadata> {
  const tool = getNicheToolByPath((await params).toolPath);
  if (!tool) return {};
  return pageMetadata({ title: tool.title, description: tool.description, path: `/${tool.path.join("/")}`, keywords: tool.keywords });
}

function CatalogContent({ tool }: { tool: NicheTool }) {
  return <>
    <section className="info-panel seo-content" aria-labelledby="catalog-requirements-heading">
      <h2 id="catalog-requirements-heading">{tool.audience}: file requirements</h2>
      <ul>{tool.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
      <h3>How to prepare the file</h3>
      <ol>{tool.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    </section>
    <section className="info-panel seo-content faq-section" aria-labelledby="catalog-faq-heading">
      <h2 id="catalog-faq-heading">Questions about this tool</h2>
      {tool.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
    </section>
  </>;
}

function schemaFor(tool: NicheTool) {
  const path = `/${tool.path.join("/")}`;
  return {
    webApplication: { "@context": "https://schema.org", "@type": "WebApplication", name: tool.title, description: tool.description, url: absoluteUrl(path), applicationCategory: "UtilitiesApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript and a modern browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    faqPage: faqSchema(tool.faqs),
  };
}

function ConvertTool({ tool }: { tool: NicheTool }) {
  return <ImageConverter from={tool.from?.[0]} to={tool.preset.format ?? tool.to} title={tool.title} introCopy={tool.description} extraContent={<CatalogContent tool={tool} />} breadcrumbs={[{ name: "Home", href: "/" }, { name: tool.title }]} />;
}

function ToolBody({ tool }: { tool: NicheTool }) {
  switch (tool.component) {
    case "compress": return <ImageCompressor title={tool.title} introCopy={tool.description} initialTargetKB={tool.target.maxKB} extraContent={<CatalogContent tool={tool} />} />;
    case "resize": return <ResizeImage title={tool.title} introCopy={tool.description} initialWidth={tool.preset.width} initialHeight={tool.preset.height} initialFormat={tool.preset.format === "png" ? "png" : "jpg"} initialQuality={tool.preset.quality} extraContent={<CatalogContent tool={tool} />} />;
    case "convert": return <ConvertTool tool={tool} />;
    case "images-to-pdf": return <ImagesToPdf variant={{ title: tool.title, intro: tool.description, accept: tool.accept ?? ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"], inputLabel: "Supported images, up to 25 MB each", faqs: tool.faqs, breadcrumbs: [{ name: "Home", href: "/" }, { name: tool.title }] }} seo={<CatalogContent tool={tool} />} />;
    case "pdf-to-images": return <PdfToImages variant={{ title: tool.title, intro: tool.description, format: tool.format === "png" ? "png" : "jpg", formatLabel: tool.format === "png" ? "PNG" : "JPG", faqs: tool.faqs, breadcrumbs: [{ name: "Home", href: "/" }, { name: tool.title }] }} seo={<CatalogContent tool={tool} />} />;
    case "merge-pdf": return <MergePdf seo={<CatalogContent tool={tool} />} breadcrumbs={[{ name: "Home", href: "/" }, { name: tool.title }]} />;
    case "split-pdf": return <SplitPdf seo={<CatalogContent tool={tool} />} breadcrumbs={[{ name: "Home", href: "/" }, { name: tool.title }]} />;
    case "compress-pdf": return <CompressPdf seo={<CatalogContent tool={tool} />} breadcrumbs={[{ name: "Home", href: "/" }, { name: tool.title }]} />;
    case "rotate-pdf": return <RotatePdf seo={<CatalogContent tool={tool} />} breadcrumbs={[{ name: "Home", href: "/" }, { name: tool.title }]} />;
  }
}

export default async function CatalogToolPage({ params }: { params: Promise<{ toolPath: string[] }> }) {
  const tool = getNicheToolByPath((await params).toolPath);
  if (!tool) notFound();
  const schema = schemaFor(tool);
  return <><JsonLd data={schema.webApplication} /><JsonLd data={schema.faqPage} /><ToolBody tool={tool} /></>;
}