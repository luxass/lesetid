import { visit } from "unist-util-visit";
import { estimate } from "lesetid";
import type { Root } from "mdast";
import type { Plugin } from "unified";

export type { Estimation } from "lesetid";

export interface Options {
  dataKey: string
}

export const remarkLesetid: Plugin<[Options], Root> = (options: Options) => {
  options ||= {
    dataKey: "estimation",
  };

  if (!options.dataKey) throw new Error("Missing dataKey");

  return function (tree, file) {
    visit(tree, "text", (node) => {
      const textOnPage = node.value;
      const estimation = estimate(textOnPage);
      file.data[options.dataKey] ||= estimation;
    });
  };
};

export default remarkLesetid;
