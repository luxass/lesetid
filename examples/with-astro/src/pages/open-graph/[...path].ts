import { getCollection } from "astro:content"
import { OGImageRoute } from "astro-og-canvas"

const posts = await getCollection("posts")

type OGImageOptions = Awaited<ReturnType<Parameters<typeof OGImageRoute>[0]["getImageOptions"]>>

const pages = Object.fromEntries(posts.map(({ id, slug, data }) => [id, { data, slug }]))

export const { getStaticPaths, GET } = OGImageRoute({
  param: "path",
  pages,
  getImageOptions: async (_, { data }: (typeof pages)[string]): Promise<OGImageOptions> => {
    return {
      title: data.title,
      description: data.description,
    }
  },
})
