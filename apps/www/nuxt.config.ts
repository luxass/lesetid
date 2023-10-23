// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@unocss/nuxt",
    "nuxt-og-image",
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  plugins: [
    "~/plugins/floating-vue.ts",
    {
      src: "~/plugins/vercel-analytics.ts",
      mode: "client",
    },
  ],
  sourcemap: false,
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📖</text></svg>",
        },
      ],
    },
    pageTransition: false,
    layoutTransition: false,
  },
  experimental: {
    typescriptBundlerResolution: true,
    viewTransition: true,
    componentIslands: true,
    payloadExtraction: true,
    typedPages: true,
  },
  css: ["@unocss/reset/tailwind.css"],
  nitro: {
    serverAssets: [
      {
        baseName: "texts",
        dir: "../examples",
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "lesetid": "../../packages/lesetid/src/index.ts",
        "lesetid/stream": "../../packages/lesetid/src/stream.ts",
        "lesetid/utils": "../../packages/lesetid/src/utils.ts",
      },
    },
  },
});
