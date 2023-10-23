import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";
import { estimate } from "lesetid";

export type RemarkPlugin<PluginParameters extends any[] = any[]> = unified.Plugin<
  PluginParameters,
  mdast.Root
>;

export function remarkLesetid(): RemarkPlugin {
  return function (tree) {
    visit(tree, "text", (node) => {
      const textOnPage = node.value;
      const estimation = estimate(textOnPage);
    });
  };
}
