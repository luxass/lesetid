export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/fontaine",
  ],
  colorMode: {
    fallback: "dark",
    preference: "dark",
    classSuffix: "",
  },
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
          type: "image/svg+xml",
          href: "/favicon.svg",
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
    typedPages: true,
  },
  css: ["@unocss/reset/tailwind.css"],
  nitro: {
    preset: "vercel-edge",
    serverAssets: [
      {
        baseName: "texts",
        dir: "../../example-articles",
      },
    ],
    routeRules: {
      "/api/examples": {
        isr: 600,
      },
      "/api/examples/:example": {
        isr: 600,
      },
    },
  },
  alias: {
    "lesetid": "../packages/lesetid/src/index.ts",
    "lesetid/stream": "../packages/lesetid/src/stream.ts",
    "lesetid/utils": "../packages/lesetid/src/utils.ts",
  },
});
