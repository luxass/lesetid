// @ts-check
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      injectReset: true,
    }),
    icon({
      include: {
        ph: ["github-logo-duotone", "question", "package", "alarm-duotone"],
        logos: ["stackblitz-icon", "codesandbox-icon"],
      },
    }),
  ],
  trailingSlash: "never",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: "./wrangler.jsonc",
    },
    imageService: "cloudflare",
  }),
});
