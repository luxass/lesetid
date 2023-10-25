import { visit } from "unist-util-visit";
import { estimate } from "lesetid";
import type { Root } from "mdast";
import type { Plugin } from "unified";

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
      if (!file.data[options.dataKey]) throw new Error("Missing data");

      file.data[options.dataKey] ||= estimation;
    });
  };
};
