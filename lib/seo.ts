import type { Metadata } from "next";
import type { Faq, HowToStep } from "@/lib/content/types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech").replace(/\/+$/, "");
export const SITE_NAME = "Filekind";
export const SITE_TITLE = "Free Image and PDF Tools Online";
export const SITE_DESCRIPTION =
  "Free browser tools to compress, resize, and convert images and to build or unbundle PDFs. Files stay on your device: no upload, no signup, no watermark.";
export const DEFAULT_OG_IMAGE = "/og.png";
export const SITE_LANGUAGE = "en";

export function absoluteUrl(path: string = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type Crumb = { name: string; href?: string };

export type PageOptions = {
  /** Full title without the brand suffix. Omit to use the layout default. */
  title?: string;
  description: string;
  /** Canonical path, e.g. "/compress-image". */
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  noindex,
}: PageOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const ogImage = { url: imageUrl, width: 1200, height: 630, alt: title ?? SITE_TITLE, type: "image/png" };
  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      ...(title ? { title } : {}),
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [ogImage],
      ...(type === "article"
        ? { publishedTime, modifiedTime, section: "Image tools" }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE_TITLE,
      description,
      images: [imageUrl],
    },
  };
}

type JsonLdNode = Record<string, unknown>;

const CONTEXT = { "@context": "https://schema.org" };

export function organizationSchema(): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon-512.png"),
    description: SITE_DESCRIPTION,
    knowsAbout: [
      "image compression",
      "image file formats",
      "PDF creation",
      "browser-based file tools",
    ],
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function softwareAppSchema({
  name,
  description,
  path,
  category = "MultimediaApplication",
  features,
}: {
  name: string;
  description: string;
  path: string;
  category?: string;
  features?: string[];
}): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern browser",
    inLanguage: SITE_LANGUAGE,
    ...(features?.length ? { featureList: features.join(", ") } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbSchema(items: Crumb[]): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function faqSchema(faqs: Faq[]): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function howToSchema({
  name,
  description,
  path,
  steps,
  updated,
}: {
  name: string;
  description: string;
  path: string;
  steps: HowToStep[];
  updated?: string;
}): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: SITE_LANGUAGE,
    ...(updated ? { dateModified: updated } : {}),
    publisher: { "@id": absoluteUrl("/#organization") },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  updated,
  published,
  section,
}: {
  title: string;
  description: string;
  path: string;
  updated: string;
  published?: string;
  section?: string;
}): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    dateModified: updated,
    ...(published ? { datePublished: published } : {}),
    ...(section ? { articleSection: section } : {}),
    inLanguage: SITE_LANGUAGE,
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function definedTermSchema({
  term,
  definition,
  path,
}: {
  term: string;
  definition: string;
  path: string;
}): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url: absoluteUrl(path),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: `${SITE_NAME} image and PDF glossary`,
      url: absoluteUrl("/glossary"),
    },
  };
}

export function itemListSchema({
  name,
  description,
  links,
}: {
  name: string;
  description?: string;
  links: { href: string; label: string }[];
}): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "ItemList",
    name,
    ...(description ? { description } : {}),
    itemListElement: links.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: link.label,
      url: absoluteUrl(link.href),
    })),
  };
}

export function webpageSchema({
  title,
  description,
  path,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  updated?: string;
}): JsonLdNode {
  return {
    ...CONTEXT,
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: SITE_LANGUAGE,
    ...(updated ? { dateModified: updated } : {}),
    isPartOf: { "@id": absoluteUrl("/#website") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
