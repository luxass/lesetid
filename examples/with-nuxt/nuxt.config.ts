// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@unocss/nuxt",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/fontaine",
  ],
  sourcemap: false,
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      title: "lesetid | nuxt example",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
      meta: [
        {
          name: "description",
          content: "A example nuxt app using lesetid",
        },
        {
          // disable darkreader
          name: "darkreader-lock",
          content: "",
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
  content: {
    highlight: {
      theme: "vitesse-dark",
    },
    markdown: {
      remarkPlugins: {
        "remark-lesetid": {
          dataKey: "estimation",
        },
      },
    },
  },
  css: ["@unocss/reset/tailwind.css"],
  devServer: {
    port: 3001,
  },
})
