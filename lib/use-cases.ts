import catalog from "@/config/use-cases.json";
import type { NichePreset } from "@/lib/niche-tools";

export type UseCase = {
  slug: string;
  path: string[];
  component: "compress" | "resize" | "convert";
  sourceFormat?: "jpg" | "png" | "webp";
  title: string;
  description: string;
  keywords: string[];
  audience: string;
  target: NichePreset & { format?: "jpg" | "png" | "webp" };
  preset: NichePreset;
  requirements: string[];
  related: { href: string; label: string }[];
};

export const useCases: UseCase[] = (catalog as Omit<UseCase, "path">[]).map((useCase) => {
  if (useCase.requirements.length !== 3) {
    throw new Error(`Use case "${useCase.slug}" must define exactly three requirements.`);
  }

  return { ...useCase, path: useCase.slug.split("/") };
});

export function getUseCaseByPath(path: string[]): UseCase | undefined {
  return useCases.find((useCase) =>
    useCase.path.length === path.length &&
    useCase.path.every((segment, index) => segment === path[index])
  );
}
