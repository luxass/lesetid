import { visit } from "unist-util-visit";
import { estimate } from "lesetid";
import type { Root } from "mdast";
import type { Plugin, Transformer } from "unified";

export type { Estimation } from "lesetid";

export interface Options {
  dataKey?: string
}

export const remarkLesetid: Plugin<[Options?], Root> = (options) => {
  if (!options) {
    options = {
      dataKey: "estimation",
    };
  }
  if (!options.dataKey) {
    throw new Error("Missing dataKey");
  }

  const { dataKey } = options;
  const transformer: Transformer<Root> = (tree, file) => {
    visit(tree, "text", (node) => {
      const textOnPage = node.value;
      const estimation = estimate(textOnPage);
      file.data[dataKey] ||= estimation;
    });
  };
  return transformer;
};

export default remarkLesetid;
export type RemarkPlugin<PluginParameters extends any[] = any[]> = Plugin<PluginParameters, Root>;
