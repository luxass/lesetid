// @ts-check
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

import { escapeSvelte, mdsvex } from "mdsvex";
import { bundledLanguages, getHighlighter } from "shikiji";
import rehypeSlug from "rehype-slug";
import { remarkLesetid } from "remark-lesetid";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  layout: {
    _: "./src/mdsvex.svelte",
  },
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await getHighlighter({ themes: ["vitesse-dark"], langs: Object.keys(bundledLanguages) });
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "vitesse-dark" }));
      return `{@html \`${html}\` }`;
    },
  },
  remarkPlugins: [remarkLesetid],
  rehypePlugins: [rehypeSlug],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
  },
};

export default config;
