export type InternalLink = { href: string; label: string };

export type Faq = { question: string; answer: string };

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  links?: InternalLink[];
};

export type ArticleBase = {
  slug: string;
  /** H1 shown on the page. Sentence case, no brand suffix. */
  title: string;
  /** <title> tag text, 45-62 characters, primary keyword first, no brand suffix. */
  metaTitle: string;
  /** meta description, 140-160 characters, includes primary keyword and a reason to click. */
  description: string;
  /** One or two sentence lead paragraph shown under the H1. */
  summary: string;
  /** ISO date, e.g. "2026-09-24". */
  updated: string;
  /** 4-8 target keywords/phrases, primary keyword first. */
  keywords: string[];
  /** 3-5 internal links. Must come from lib/content/links.ts. */
  related: InternalLink[];
  sections: ArticleSection[];
  faqs: Faq[];
};

export type GuideKind = "howto" | "usecase" | "guide";

export type HowToStep = { name: string; text: string };

export type Guide = ArticleBase & {
  kind: GuideKind;
  /** Required when kind is "howto". 4-8 steps, each 1-2 sentences. */
  steps?: HowToStep[];
  /** Primary tool call to action. Must come from lib/content/links.ts. */
  tool: InternalLink;
};

export type GlossaryTerm = ArticleBase & {
  /** The term itself, e.g. "JPEG". */
  term: string;
  /** One-sentence definition, 20-40 words. Used for the meta description fallback and DefinedTerm schema. */
  definition: string;
  /** Primary tool or hub link. Must come from lib/content/links.ts. */
  tool: InternalLink;
};

export type ComparisonRow = { aspect: string; a: string; b: string };

export type Comparison = ArticleBase & {
  /** The two subjects, e.g. "JPG" and "PNG". */
  a: string;
  b: string;
  /** 6-10 comparison rows shown as a table. */
  rows: ComparisonRow[];
  /** 2-4 sentence conclusion naming the better default and when the other wins. */
  verdict: string;
  /** Primary tool call to action. Must come from lib/content/links.ts. */
  tool: InternalLink;
};
