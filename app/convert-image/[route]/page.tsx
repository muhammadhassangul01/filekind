import type { Metadata } from "next";
import ImageConverter from "../../components/image-converter";
import { pageMetadata } from "@/lib/seo";

type Format = "jpg" | "png" | "webp";
type RouteConfig = { from: Format; to: Format; fromLabel: string; toLabel: string; title: string; description: string; keywords: string[] };

const configs: Record<string, RouteConfig> = {
  "jpg-to-png": {
    from: "jpg",
    to: "png",
    fromLabel: "JPG",
    toLabel: "PNG",
    title: "JPG to PNG Converter Online Free",
    description:
      "Convert JPG to PNG images online for free. Your JPEG stays in your browser, with no upload, no signup, and no watermark on the result.",
    keywords: ["jpg to png", "jpg to png converter", "convert jpg to png", "jpeg to png", "jpg to png online", "image converter"],
  },
  "jpg-to-webp": {
    from: "jpg",
    to: "webp",
    fromLabel: "JPG",
    toLabel: "WebP",
    title: "JPG to WebP Converter Online Free",
    description:
      "Convert JPG to WebP online for free. Make smaller modern images for websites entirely in your browser, with no upload and no signup.",
    keywords: ["jpg to webp", "jpg to webp converter", "convert jpg to webp", "jpeg to webp", "jpg to webp online"],
  },
  "png-to-jpg": {
    from: "png",
    to: "jpg",
    fromLabel: "PNG",
    toLabel: "JPG",
    title: "PNG to JPG Converter Online Free",
    description:
      "Convert PNG to JPG online for free, with transparency filled white. Private in-browser conversion with no upload, no signup, and no watermark.",
    keywords: ["png to jpg", "png to jpg converter", "convert png to jpg", "png to jpeg", "png to jpg online"],
  },
  "png-to-webp": {
    from: "png",
    to: "webp",
    fromLabel: "PNG",
    toLabel: "WebP",
    title: "PNG to WebP Converter Online Free",
    description:
      "Convert PNG to WebP online for free. Keep the image sharp while shrinking the file for the web, all processed in your browser.",
    keywords: ["png to webp", "png to webp converter", "convert png to webp", "png to webp online"],
  },
  "webp-to-jpg": {
    from: "webp",
    to: "jpg",
    fromLabel: "WebP",
    toLabel: "JPG",
    title: "WebP to JPG Converter Online Free",
    description:
      "Convert WebP to JPG online for free so any app or website can open the image. Convert privately in your browser with no signup.",
    keywords: ["webp to jpg", "webp to jpg converter", "convert webp to jpg", "webp to jpeg", "webp to jpg online"],
  },
  "webp-to-png": {
    from: "webp",
    to: "png",
    fromLabel: "WebP",
    toLabel: "PNG",
    title: "WebP to PNG Converter Online Free",
    description:
      "Convert WebP to PNG online for free. Get an editable PNG from a WebP file in your browser, with no upload and no account needed.",
    keywords: ["webp to png", "webp to png converter", "convert webp to png", "webp to png online"],
  },
};

export function generateStaticParams() {
  return Object.keys(configs).map((route) => ({ route }));
}

export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const config = configs[(await params).route];
  if (!config) return {};
  const path = `/convert-image/${config.from}-to-${config.to}`;
  return pageMetadata({
    title: config.title,
    description: config.description,
    path,
    keywords: config.keywords,
  });
}

export default async function ImagePairPage({ params }: { params: Promise<{ route: string }> }) {
  const config = configs[(await params).route];
  if (!config) return null;
  return (
    <ImageConverter
      from={config.from}
      to={config.to}
      title={`Convert ${config.fromLabel} to ${config.toLabel}`}
      introCopy={`Turn a ${config.fromLabel} image into a ${config.toLabel} file locally in your browser. Your file stays on your device.`}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Convert image", href: "/convert-image" },
        { name: `${config.fromLabel} to ${config.toLabel}` },
      ]}
    />
  );
}
