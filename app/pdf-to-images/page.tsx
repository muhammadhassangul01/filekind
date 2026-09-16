import type { Metadata } from "next";
import PdfToImages from "../components/pdf-to-images";

export const metadata: Metadata = { title: "Convert PDF Pages to JPG or PNG", description: "Render PDF pages as numbered JPG or PNG images privately in your browser.", alternates: { canonical: "/pdf-to-images" } };
export default function PdfToImagesPage() { return <PdfToImages />; }
