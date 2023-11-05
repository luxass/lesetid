// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@unocss/nuxt",
    "nuxt-og-image",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/fontaine",
  ],
  site: {
    url: "https://lesetid.dev",
  },
  devtools: {
    enabled: true,
  },
  plugins: [
    {
      src: "~/plugins/vercel-analytics.ts",
      mode: "client",
    },
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
    payloadExtraction: true,
    typedPages: true,
  },
  css: ["@unocss/reset/tailwind.css"],
  nitro: {
    serverAssets: [
      {
        baseName: "texts",
        dir: "../example-texts",
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "lesetid": "../packages/lesetid/src/index.ts",
        "lesetid/stream": "../packages/lesetid/src/stream.ts",
        "lesetid/utils": "../packages/lesetid/src/utils.ts",
      },
    },
  },
});
