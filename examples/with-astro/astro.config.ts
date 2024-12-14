import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkLesetid from "remark-lesetid/astro";
import { asides } from "./remark-plugins/asides";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-example.lesetid.dev",
  integrations: [
    sitemap(),
    mdx(),
    tailwind({
      nesting: true,
    }),
    solid(),
    icon(),
  ],
  experimental: {
    contentCollectionCache: true,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  markdown: {
    shikiConfig: {
      theme: "vitesse-light",
    },
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    }]],
    remarkPlugins: [remarkDirective, asides, remarkLesetid],
  },
  compressHTML: false,
  output: "hybrid",
  adapter: netlify(),
});
