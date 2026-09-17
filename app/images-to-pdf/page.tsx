import type { Metadata } from "next";
import ImagesToPdf from "../components/images-to-pdf";
import { ImagesToPdfSeoContent } from "../components/seo-content";

export const metadata: Metadata = { title: "Convert Images to PDF — JPG, PNG & WebP | Filekind", description: "Combine JPG, PNG, or WebP images into a PDF, reorder them, and choose fit, A4, Letter, orientation, and margins.", alternates: { canonical: "/images-to-pdf" } };
export default function ImagesToPdfPage() { return <><ImagesToPdf /><section className="page seo-page"><ImagesToPdfSeoContent /></section></>; }
