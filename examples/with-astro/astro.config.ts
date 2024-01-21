import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeExternalLinks from "rehype-external-links"
import { remarkLesetid } from "remark-lesetid/astro"
import tailwind from "@astrojs/tailwind"

import remarkDirective from "remark-directive"
import icon from "astro-icon"
import solid from "@astrojs/solid-js"
import { FontaineTransform } from "fontaine"
import { asides } from "./remark-plugins/asides"

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
      experimentalThemes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    }]],
    remarkPlugins: [remarkDirective, asides, remarkLesetid],
  },
  compressHTML: false,
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ["Arial"],
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url), // id is the font src value in the CSS
      }),
    ],
  },
})
