import {
  type Estimation,
  estimate,
} from "lesetid"
import { toString } from "mdast-util-to-string"
import type { Plugin } from "unified"
import type { Root } from "mdast"

const remarkLesetid: Plugin<void[], Root> = () => {
  return (tree, file) => {
    const textOnPage = toString(tree)
    const estimation = estimate(textOnPage)
    if (!file.data.astro) throw new Error("Missing astro data")
    file.data.astro.frontmatter ||= {}

    file.data.astro.frontmatter.estimation = estimation
  }
}

export default remarkLesetid

declare module "vfile" {
  interface DataMap {
    astro: {
      frontmatter?: {
        estimation?: Estimation
      }
    }
  }
}
