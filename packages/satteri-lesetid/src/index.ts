import type { Estimation, Options as LesetidOptions } from "lesetid";
import { estimate } from "lesetid";
import type { MdastPluginDefinition } from "satteri";

export type { Estimation };

export interface Options extends LesetidOptions {
  /**
   * The key that receives the estimation. When Astro renders the document, the
   * key is set in the page frontmatter. Otherwise it is set in the `data` of the
   * compile result.
   *
   * @default "estimation"
   */
  dataKey?: string;
}

/**
 * Returns the frontmatter object that Astro seeds in `data.astro` before
 * plugins run, or `undefined` when Astro is not rendering the document.
 */
function getAstroFrontmatter(data: Record<string, unknown>): Record<string, unknown> | undefined {
  const astro = data.astro;
  if (typeof astro !== "object" || astro === null || !("frontmatter" in astro)) {
    return undefined;
  }

  const frontmatter = astro.frontmatter;
  if (typeof frontmatter !== "object" || frontmatter === null) {
    return undefined;
  }

  return frontmatter as Record<string, unknown>;
}

/**
 * Creates a Sätteri mdast plugin that estimates the reading time of each
 * document.
 *
 * When Astro renders the document, the estimation goes into the page
 * frontmatter, so pages and content collections can read
 * `frontmatter.estimation`. Otherwise it goes into the `data` of the compile
 * result.
 *
 * @param {Options} [options] - the lesetid options and the key to set.
 * @returns {MdastPluginDefinition} the plugin to add to `mdastPlugins`.
 */
export function satteriLesetid(options: Options = {}): MdastPluginDefinition {
  const { dataKey = "estimation", ...estimateOptions } = options;
  if (!dataKey) {
    throw new Error("satteri-lesetid: `dataKey` must not be empty");
  }

  return {
    name: "satteri-lesetid",
    after(root, ctx) {
      const estimation = estimate(ctx.textContent(root), estimateOptions);

      const frontmatter = getAstroFrontmatter(ctx.data);
      if (frontmatter) {
        frontmatter[dataKey] = estimation;
        return;
      }

      ctx.data[dataKey] = estimation;
    },
  };
}

export default satteriLesetid;

declare module "satteri" {
  interface DataMap {
    estimation?: Estimation;
  }
}
