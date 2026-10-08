import { guidesA } from "./guides-a";
import { guidesB } from "./guides-b";
import { glossaryTerms } from "./glossary";
import { comparisons } from "./comparisons";
import type { Guide } from "./types";

export const guides: Guide[] = [...guidesA, ...guidesB];
export { glossaryTerms, comparisons };
export * from "./types";
export * from "./links";

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getTerm(slug: string) {
  return glossaryTerms.find((term) => term.slug === slug);
}

export function getComparison(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export type GuideGroup = { heading: string; blurb: string; slugs: string[] };

export const guideGroups: GuideGroup[] = [
  {
    heading: "Compress and shrink images",
    blurb: "Fit photos under an upload limit without guessing at settings.",
    slugs: [
      "how-to-compress-a-photo-to-200kb",
      "how-to-reduce-image-size-in-kb",
      "how-to-compress-a-picture-for-email",
      "how-to-shrink-a-photo-for-whatsapp",
      "how-to-reduce-image-size-for-instagram",
      "compress-image-for-government-form",
      "reduce-image-size-for-job-application",
      "reduce-image-size-for-college-admission-form",
      "how-to-upload-large-photos-to-a-website",
      "how-to-keep-image-quality-when-compressing",
    ],
  },
  {
    heading: "Convert image formats",
    blurb: "Move between JPG, PNG, and WebP on a phone, laptop, or Chromebook.",
    slugs: [
      "how-to-convert-jpg-to-png",
      "how-to-convert-png-to-jpg",
      "how-to-convert-webp-to-jpg",
      "how-to-convert-jpg-to-webp",
      "how-to-convert-webp-to-png",
      "how-to-convert-png-to-webp",
      "how-to-change-an-image-file-type",
      "how-to-convert-images-on-iphone",
      "how-to-convert-images-on-android",
    ],
  },
  {
    heading: "PDF tasks",
    blurb: "Build documents from photos and pull pages back out as images.",
    slugs: [
      "how-to-make-a-pdf-from-photos",
      "how-to-combine-images-into-one-pdf",
      "how-to-make-a-photo-pdf-on-a-phone",
      "how-to-convert-pdf-to-jpg",
      "how-to-convert-pdf-to-png",
      "how-to-extract-images-from-a-pdf",
    ],
  },
  {
    heading: "Resize and image size",
    blurb: "Set exact dimensions, understand resolution, and plan for the web.",
    slugs: [
      "how-to-resize-an-image",
      "how-to-reduce-photo-resolution",
      "how-to-resize-a-photo-for-a-website",
      "how-to-check-an-image-file-size",
    ],
  },
  {
    heading: "Understand your files",
    blurb: "What formats, quality, and file size actually mean for your images.",
    slugs: [
      "why-is-my-image-file-so-big",
      "image-quality-vs-file-size",
      "how-to-open-a-webp-image",
    ],
  },
];

export function guidesInGroup(group: GuideGroup): Guide[] {
  return group.slugs
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => Boolean(guide));
}
