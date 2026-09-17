import type { Metadata } from "next";
import ImageCompressor from "../components/image-compressor";

export const metadata: Metadata = { title: "Compress Images to KB or MB Online | Filekind", description: "Reduce JPEG or PNG file size to a custom KB or MB limit in your browser. Output is a JPEG at or below your target.", alternates: { canonical: "/compress-image" } };

export default function CompressImagePage() { return <ImageCompressor />; }