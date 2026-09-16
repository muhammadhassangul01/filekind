import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";

export const metadata: Metadata = { title: "Convert Images to PDF", description: "Arrange JPEG, PNG, and WebP images into a PDF in your browser.", alternates: { canonical: "/images-to-pdf" } };
export default function ImagesToPdfPage() { return <ImagesToPdf />; }
