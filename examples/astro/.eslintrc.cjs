/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: [
    "@luxass",
    "plugin:@unocss/recommended",
    "plugin:astro/recommended",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  ],
};

module.exports = config;
