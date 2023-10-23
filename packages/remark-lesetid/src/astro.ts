import {
  estimate,
} from "lesetid";
import { toString } from "mdast-util-to-string";
import type * as mdast from "mdast";
import type * as unified from "unified";

export type RemarkPlugin<PluginParameters extends any[] = any[]> = unified.Plugin<
  PluginParameters,
  mdast.Root
>;

export function remarkLesetid(): RemarkPlugin {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const estimation = estimate(textOnPage);

    data.astro.frontmatter.estimation = estimation;
  };
}
