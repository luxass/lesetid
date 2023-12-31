import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import Icons from "unplugin-icons/vite";
import vue from "@astrojs/vue";
import rehypeExternalLinks from "rehype-external-links";

import {
  remarkLesetid,
} from "remark-lesetid/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-example.lesetid.dev",
  integrations: [
    unocss({
      injectReset: true,
    }),
    sitemap(),
    mdx({
      optimize: {
        customComponentNames: [
          "a",
        ],
      },
    }),
    vue(),
  ],
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
      wrap: false,
    },
    smartypants: true,
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    }]],
    remarkPlugins: [
      remarkLesetid,
    ],
  },
  compressHTML: false,
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
