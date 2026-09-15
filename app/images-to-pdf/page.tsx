import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";

export const metadata: Metadata = { title: "Convert Images to PDF", description: "Arrange JPEG, PNG, and WebP images into an A4 PDF in your browser." };
export default function ImagesToPdfPage() { return <ImagesToPdf />; }
