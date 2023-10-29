import type { MetadataRoute } from "next";
import { allPosts } from "~/contentlayer";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = allPosts.map((post) => ({
    url: `https://next-example.lesetid.dev/${post.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: "https://next-example.lesetid.dev/",
      lastModified: new Date().toISOString(),
    },
    ...posts,
  ];
}
