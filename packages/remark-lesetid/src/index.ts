import type { Estimation, Options as LesetidOptions } from "lesetid";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { estimate } from "lesetid";
import { visit } from "unist-util-visit";

export type { Estimation };

export interface Options extends LesetidOptions {
  dataKey?: string;
}

const remarkLesetid: Plugin<Options[], Root> = (options) => {
  if (!options) {
    options = {
      dataKey: "estimation",
    };
  }
  if (!options.dataKey) {
    throw new Error("Missing dataKey");
  }

  const { dataKey, ...rest } = options;

  return (tree, file) => {
    let textOnPage = "";
    visit(tree, "text", (node) => {
      textOnPage += node.value;
    });

    const estimation = estimate(textOnPage, rest);
    // if matter is defined in data, the frontmatter
    // parser is vfile-matter.
    if ("matter" in file.data && file.data.matter) {
      file.data.matter[dataKey] ||= estimation;
      return;
    }

    file.data[dataKey] ||= estimation;
  };
};

export default remarkLesetid;

declare module "vfile" {
  interface DataMap {
    matter?: {
      [key: string]: unknown;
      estimation?: Estimation;
    };

    estimation?: Estimation;
  }
}
