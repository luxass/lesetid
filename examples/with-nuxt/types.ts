import type { Estimation } from "remark-lesetid";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export interface ContentWithEstimation extends ParsedContent {
  title: string;
  description: string;
  date: string;
  published: boolean;
  shortTitle: string;
  estimation: Estimation;
}
