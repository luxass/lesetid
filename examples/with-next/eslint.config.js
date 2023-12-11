// @ts-check
const { luxass } = require("@luxass/eslint-config");

module.exports = luxass({
  tailwindcss: {
    config: "./tailwind.config.ts",
  },
  nextjs: true,
  react: {
    a11y: true,
  },
  unocss: false,
  ignores: [
    ".contentlayer/**",
  ],
});
