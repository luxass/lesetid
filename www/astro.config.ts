// @ts-check
import { fileURLToPath } from "node:url";
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      injectReset: true,
    }),
  ],
  trailingSlash: "never",
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  session: {
    driver: {
      entrypoint: "unstorage/drivers/null",
    },
  },
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
