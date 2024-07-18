export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
  ],
  sourcemap: false,
  colorMode: {
    classSuffix: "",
  },
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },
  future: {
    typescriptBundlerResolution: true,
  },
  routeRules: {
    "/": {
      isr: 86400,
    },
    "/**": {
      isr: 86400,
    },
    "/api/examples": {
      isr: 86400,
    },
    "/api/examples/:example": {
      isr: 86400,
    },
  },
  nitro: {
    compressPublicAssets: true,
    preset: "netlify",
    serverAssets: [
      {
        baseName: "texts",
        dir: "../articles",
      },
    ],
  },
  alias: {
    "lesetid": "../packages/lesetid/src/index.ts",
    "lesetid/stream": "../packages/lesetid/src/stream.ts",
    "lesetid/utils": "../packages/lesetid/src/utils.ts",
  },
});
