import type { Metadata } from "next";
import ImageConverter from "../components/image-converter";

export const metadata: Metadata = { title: "Convert JPG, PNG and WebP Images | Filekind", description: "Convert JPG, PNG, and static WebP images between supported formats in your browser.", alternates: { canonical: "/convert-image" } };

export default function ConvertImagePage() {
  return <ImageConverter />;
}
