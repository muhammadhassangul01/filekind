import type { Metadata } from "next";
import ImageCompressor from "./components/image-compressor";

export const metadata: Metadata = {
  title: "Compress Image to KB or MB",
  description: "Compress JPEG and PNG images to a target size in your browser.",
};

export default function Home() { return <ImageCompressor />; }
