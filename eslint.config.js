// @ts-check
import {
  luxass,
} from "@luxass/eslint-config";

export default await luxass({
  astro: {
    a11y: true,
  },
  tailwindcss: {
    config: "./examples/next/tailwind.config.ts",
  },
  nextjs: {
    rootDir: "./examples/next",
  },
  react: {
    a11y: true,
  },
});
