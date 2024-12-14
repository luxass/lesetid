import type { ParsedContent } from "@nuxt/content";
import type { Estimation } from "remark-lesetid";

export interface ContentWithEstimation extends ParsedContent {
  title: string;
  description: string;
  date: string;
  published: boolean;
  shortTitle: string;
  estimation: Estimation;
}
