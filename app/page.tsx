import type { Metadata } from "next";
import ImageCompressor from "./components/image-compressor";

export const metadata: Metadata = {
  title: "Image compressor",
  description: "Compress JPEG and PNG images to a target size in your browser.",
};

export default function Home() { return <ImageCompressor />; }
