import type { Estimation } from "remark-lesetid";
import type { ParsedContent } from "@nuxt/content";

export interface ContentWithEstimation extends ParsedContent {
  title: string;
  description: string;
  date: string;
  published: boolean;
  shortTitle: string;
  estimation: Estimation;
}
