import type { MetadataRoute } from "next";
import { getBlogPosts } from "~/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getBlogPosts().map((post) => ({
    url: `https://next-example.lesetid.dev/posts/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  return [
    {
      url: "https://next-example.lesetid.dev/",
      lastModified: new Date().toISOString().split("T")[0],
    },
    ...posts,
  ];
}
