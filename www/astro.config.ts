// @ts-check
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
      },
    }),
  ],
  env: {
    schema: {
      GITHUB_TOKEN: {
        access: "secret",
        context: "server",
        type: "string",
      },
    },
    validateSecrets: true,
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
