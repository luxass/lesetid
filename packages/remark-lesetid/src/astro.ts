import type { Estimation, Options } from "lesetid";
import { estimate } from "lesetid";
import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";

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
