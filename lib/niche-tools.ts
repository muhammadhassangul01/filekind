import catalog from "@/config/niche-tools.json";

export type NicheFaq = { question: string; answer: string };
export type NichePreset = {
  targetKB?: number;
  width?: number;
  height?: number;
  format?: "jpg" | "png" | "webp";
  quality?: number;
};
export type NicheTool = {
  path: string[];
  slug: string;
  component: "compress" | "resize" | "convert" | "images-to-pdf" | "pdf-to-images" | "merge-pdf" | "split-pdf" | "compress-pdf" | "rotate-pdf";
  tool: "compress" | "resize" | "convert" | "images-to-pdf" | "pdf-to-images" | "merge-pdf" | "split-pdf" | "compress-pdf" | "rotate-pdf";
  title: string;
  description: string;
  keywords: string[];
  audience: string;
  target: { width?: number; height?: number; maxKB?: number };
  format: "jpg" | "png" | "webp";
  preset: NichePreset;
  requirements: string[];
  steps: string[];
  faqs: NicheFaq[];
  from?: string[];
  to?: string;
  accept?: string[];
};

type CatalogTool = Partial<NicheTool> & {
  slug: string;
  tool: NicheTool["tool"];
  title: string;
  description: string;
  keywords: string[];
  audience: string;
  preset?: NichePreset;
  guidelines?: string[];
  faq?: Array<{ q: string; a: string }>;
};

export const nicheTools: NicheTool[] = (catalog as CatalogTool[]).map((tool) => {
  const preset = tool.preset ?? {
    width: tool.target?.width,
    height: tool.target?.height,
    targetKB: tool.target?.maxKB,
    format: tool.format,
  };
  const path = tool.path ?? tool.slug.split("/");
  const faqs = tool.faqs ?? tool.faq?.map((faq) => ({ question: faq.q, answer: faq.a })) ?? [];
  return {
    ...tool,
    path,
    component: tool.component ?? tool.tool,
    target: {
      width: preset.width,
      height: preset.height,
      maxKB: preset.targetKB,
    },
    format: preset.format ?? tool.format ?? "jpg",
    preset,
    requirements: tool.requirements ?? tool.guidelines ?? [],
    steps: tool.steps ?? ["Choose the file.", "Apply the recommended settings.", "Download and verify the result before uploading."],
    faqs,
  };
});

export function getNicheTool(slug: string): NicheTool | undefined {
  return nicheTools.find((tool) => tool.path.join("/") === slug || tool.slug === slug);
}

export function getNicheToolByPath(path: string[]): NicheTool | undefined {
  return nicheTools.find((tool) => tool.path.length === path.length && tool.path.every((segment, index) => segment === path[index]));
}
