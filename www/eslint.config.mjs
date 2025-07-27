// @ts-check
import { luxass } from "@luxass/eslint-config";

export default luxass({
  unocss: true,
  astro: true,
  formatters: true,
  pnpm: true,
}, {
  ignores: [
    "./worker-configuration.d.ts",
  ],
});
