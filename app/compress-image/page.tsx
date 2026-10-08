import type { Metadata } from "next";
import ImageCompressor from "../components/image-compressor";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compress Image to KB or MB Online Free",
  description:
    "Compress JPG or PNG images to a target KB or MB size in your browser. Free, private, and no signup, with every result verified at or below your limit.",
  path: "/compress-image",
  keywords: [
    "compress image",
    "image compressor",
    "compress photo to 200kb",
    "reduce image size in kb",
    "compress jpeg online",
    "compress png",
    "image size reducer",
    "photo compressor",
  ],
});

export default function CompressImagePage() {
  return <ImageCompressor />;
}
