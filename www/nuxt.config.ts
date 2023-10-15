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
  ],
  sourcemap: false,
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
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
  css: [
    "@unocss/reset/tailwind.css",
  ],
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
        "lesetid": "../src/index.ts",
        "lesetid/stream": "../src/stream.ts",
        "lesetid/utils": "../src/utils.ts",
      },
    },
  },
});
