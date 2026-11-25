import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";
import remarkLesetid from "remark-lesetid/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkLesetid],
  },
});
