import type { Estimation, Options } from "lesetid";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import {
  estimate,
} from "lesetid";
import { toString } from "mdast-util-to-string";

export type { Estimation, Options };

const remarkLesetid: Plugin<Options[], Root> = (options) => {
  return (tree, file) => {
    const textOnPage = toString(tree);
    const estimation = estimate(textOnPage, options);
    if (!file.data.astro) throw new Error("Missing astro data");
    file.data.astro.frontmatter ||= {};

    file.data.astro.frontmatter.estimation = estimation;
  };
};

export default remarkLesetid;

declare module "vfile" {
  interface DataMap {
    astro: {
      frontmatter?: {
        estimation?: Estimation;
      };
    };
  }
}
