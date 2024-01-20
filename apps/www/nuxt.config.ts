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
    pageTransition: false,
    layoutTransition: false,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    viewTransition: true,
    componentIslands: true,
    typedPages: true,
  },
  nitro: {
    preset: "vercel",
    serverAssets: [
      {
        baseName: "texts",
        dir: "../articles",
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
  tailwindcss: {
    // exposeConfig: true,
  },
  alias: {
    "lesetid": "../packages/lesetid/src/index.ts",
    "lesetid/stream": "../packages/lesetid/src/stream.ts",
    "lesetid/utils": "../packages/lesetid/src/utils.ts",
  },
})
