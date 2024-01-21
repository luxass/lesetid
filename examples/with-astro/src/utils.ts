import type { GetStaticPathsOptions, GetStaticPathsResult } from "astro"
import { getStaticPaths } from "./pages/open-graph/[...path]"

const routes = (await getStaticPaths({} as GetStaticPathsOptions)) as GetStaticPathsResult

const paths = new Set(routes.map(({ params }) => params.path))

export function getOgImageUrl(path: string): string | undefined {
  const imagePath = `${path.replace(/^\//, "").replace(/\/$/, "")}.png`
  if (paths.has(imagePath)) return `/open-graph/${imagePath}`
}
