// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "nuxt-icon",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
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
      title: "nuxt example | lesetid.dev",
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
      isr: 86400,
    },
    "/**": {
      isr: 86400,
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
    preset: "netlify-builder",
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
  devServer: {
    port: 3001,
  },
})
