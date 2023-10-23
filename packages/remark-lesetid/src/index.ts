// import { visit } from "unist-util-visit";
// import { estimate } from "lesetid";
import type { Root } from "mdast";
import type { Plugin } from "unified";

export interface Options {

}

export function remarkLesetid(): Plugin<
  [(Readonly<Options> | null | undefined)?],
  Root,
  string
> {
  return function (options) {
    console.info("options", options);

    // visit(tree, "text", (node) => {
    //   const textOnPage = node.value;
    //   const estimation = estimate(textOnPage);
    //   console.info("estimation", estimation);
    // });
  };
}
