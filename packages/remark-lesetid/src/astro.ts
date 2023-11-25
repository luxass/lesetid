import {
  estimate,
} from "lesetid";
import { toString } from "mdast-util-to-string";
import type { Transformer } from "unified";
import type { Root } from "mdast";

export function remarkLesetid(): Transformer<Root> {
  const transformer: Transformer<Root> = (tree, file) => {
    const textOnPage = toString(tree);
    const estimation = estimate(textOnPage);
    if (!file.data.astro) throw new Error("Missing astro data");
    file.data.astro.frontmatter ||= {};

    file.data.astro.frontmatter.estimation = estimation;
  };

  return transformer;
}

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
