import { visit } from "unist-util-visit"
import { estimate } from "lesetid"
import type { Root } from "mdast"
import type { Transformer } from "unified"

export type { Estimation } from "lesetid"

export interface Options {
  dataKey?: string
}

export function remarkLesetid(options?: Readonly<Options> | null | undefined): Transformer<Root> {
  if (!options) {
    options = {
      dataKey: "estimation",
    }
  }
  if (!options.dataKey) {
    throw new Error("Missing dataKey")
  }

  const { dataKey } = options
  const transformer: Transformer<Root> = (tree, file) => {
    visit(tree, "text", (node) => {
      const textOnPage = node.value
      const estimation = estimate(textOnPage)
      file.data[dataKey] ||= estimation
    })
  }
  return transformer
}

export default remarkLesetid
