import {
  estimate,
} from "lesetid";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export const remarkLesetid: Plugin<any[], Root> = () => {
  return (tree, file) => {
    const textOnPage = toString(tree);
    const estimation = estimate(textOnPage);
    if (!file.data.astro) throw new Error("Missing astro data");
    file.data.astro.frontmatter ||= {};

    file.data.astro.frontmatter.estimation = estimation;
  };
};

declare module "vfile" {
  interface DataMap {
    astro: {
      frontmatter?: {
        estimation?: {
          minutes: number
          words: number
        }
      }
    }
  }
}
