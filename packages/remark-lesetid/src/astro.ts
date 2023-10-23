// import {
//   estimate,
// } from "lesetid";
// import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export interface Options {

}

export function remarkLesetid(): Plugin<
  [(Readonly<Options> | null | undefined)?],
  Root,
  string
> {
  return function (options) {
    console.info("options", options);
    // return function (tree, { data }) {
    // const textOnPage = toString(tree);
    // const estimation = estimate(textOnPage);

    // data.astro.frontmatter.estimation = estimation;
  };
}
