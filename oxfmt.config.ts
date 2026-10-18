import { defineConfig } from "oxfmt";

export default defineConfig({
  singleQuote: false,
  semi: true,
  sortPackageJson: true,
  sortImports: {
    groups: [
      ["type-import"],
      ["type-builtin", "value-builtin"],
      ["type-external", "value-external", "type-internal", "value-internal"],
      ["type-parent", "type-sibling", "type-index", "value-parent", "value-sibling", "value-index"],
      ["unknown"],
    ],
    newlinesBetween: true,
    order: "asc",
  },
  ignorePatterns: [
    ".pnpm-store/**",
    "**/node_modules/**",
    "**/dist/**",
    "**/.cache/**",
    "**/.turbo/**",
    "**/.astro/**",
    "**/.next/**",
    "**/.wrangler/**",
    "**/coverage/**",
    "pnpm-lock.yaml",
    "www/worker-configuration.d.ts",
    // Oxfmt 0.72 does not format Astro, SVG, or XML files. See README.md.
    "**/*.astro",
    "**/*.svg",
    "**/*.xml",
  ],
});
