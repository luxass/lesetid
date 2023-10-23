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
    {
      files: [".github/workflows/*.yml"],
      rules: {
        "yml/no-empty-mapping-value": "off",
      },
    },
  ],
};

module.exports = config;
