import type { Metadata } from "next";
import PdfToImages from "../components/pdf-to-images";
import { PdfToImagesSeoContent } from "../components/seo-content";

export const metadata: Metadata = { title: "Convert PDF to JPG or PNG Images | Filekind", description: "Render complete PDF pages as JPG or PNG images in your browser, then download individual pages or a ZIP.", alternates: { canonical: "/pdf-to-images" } };
export default function PdfToImagesPage() { return <><PdfToImages /><section className="page seo-page"><PdfToImagesSeoContent /></section></>; }
