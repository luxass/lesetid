// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "nuxt-icon",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
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
    compatibilityVersion: 4,
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
        default: "vitesse-light",
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
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
  devServer: {
    port: 3001,
  },
  compatibilityDate: "2024-07-03",
});
