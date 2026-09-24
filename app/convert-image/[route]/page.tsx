import type { Metadata } from "next";
import ImageConverter from "../../components/image-converter";

type Format = "jpg" | "png" | "webp";
type RouteConfig = { from: Format; to: Format; fromLabel: string; toLabel: string };

const configs: Record<string, RouteConfig> = {
  "jpg-to-png": { from: "jpg", to: "png", fromLabel: "JPG", toLabel: "PNG" },
  "jpg-to-webp": { from: "jpg", to: "webp", fromLabel: "JPG", toLabel: "WebP" },
  "png-to-jpg": { from: "png", to: "jpg", fromLabel: "PNG", toLabel: "JPG" },
  "png-to-webp": { from: "png", to: "webp", fromLabel: "PNG", toLabel: "WebP" },
  "webp-to-jpg": { from: "webp", to: "jpg", fromLabel: "WebP", toLabel: "JPG" },
  "webp-to-png": { from: "webp", to: "png", fromLabel: "WebP", toLabel: "PNG" },
};

export function generateStaticParams() {
  return Object.keys(configs).map((route) => ({ route }));
}

export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const config = configs[(await params).route];
  if (!config) return {};
  return {
    title: `${config.fromLabel} to ${config.toLabel} Converter Online | Filekind`,
    description: `Convert ${config.fromLabel} images to ${config.toLabel} privately in your browser. No upload or signup required.`,
    alternates: { canonical: `/convert-image/${config.fromLabel.toLowerCase()}-to-${config.toLabel.toLowerCase()}` },
  };
}

export default async function ImagePairPage({ params }: { params: Promise<{ route: string }> }) {
  const config = configs[(await params).route];
  if (!config) return null;
  return <ImageConverter from={config.from} to={config.to} title={`Convert ${config.fromLabel} to ${config.toLabel}`} introCopy={`Turn a ${config.fromLabel} image into a ${config.toLabel} file locally in your browser. Your file stays on your device.`} />;
}
