module.exports = {
  root: true,
  extends: [
    "@luxass/eslint-config-ts",
    "plugin:svelte/recommended",
  ],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};
