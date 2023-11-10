import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel/serverless";
import Icons from "unplugin-icons/vite";
import vue from "@astrojs/vue";
import rehypeExternalLinks from "rehype-external-links";
import prefetch from "@astrojs/prefetch";
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
    prefetch({
      throttle: 5,
    }),
  ],
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
      // @ts-expect-error - TODO: fix...
      remarkLesetid,
    ],
  },
  compressHTML: false,
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    edgeMiddleware: true,
    functionPerRoute: false,
  }),
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
