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
      ],
    },
  },
  future: {
    typescriptBundlerResolution: true,
  },
  routeRules: {
    "/": {
      isr: 3600,
    },
    "/**": {
      isr: 3600,
    },
    "/api/examples": {
      isr: 3600,
    },
    "/api/examples/:example": {
      isr: 3600,
    },
  },
  content: {
    highlight: {
      theme: {
        default: "vitesse-dark",
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
    markdown: {
      remarkPlugins: {
        "remark-lesetid": {
          dataKey: "estimation",
        },
      },
    },
  },
  nitro: {
    preset: "netlify",
  },
  devServer: {
    port: 3001,
  },
})
