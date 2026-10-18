import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["unicorn", "typescript", "oxc"],
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
    "www/worker-configuration.d.ts",
  ],
  categories: {
    correctness: "error",
    perf: "error",
    suspicious: "error",
    pedantic: "warn",
  },
  rules: {
    "eslint/no-await-in-loop": "off",
    "no-console": ["error", { allow: ["error"] }],
    "no-shadow": "off",
    "eslint/eqeqeq": ["warn", "always", { null: "ignore" }],
    "typescript/no-explicit-any": "error",
    "typescript/no-unnecessary-boolean-literal-compare": "off",
    "typescript/prefer-readonly-parameter-types": "off",
    "typescript/no-unsafe-type-assertion": "off",
    curly: "off",
  },
  overrides: [
    {
      files: ["examples/nextjs/**/*.{js,jsx,ts,tsx}"],
      plugins: ["unicorn", "typescript", "oxc", "react", "nextjs", "jsx-a11y"],
      env: { browser: true, node: true },
    },
    {
      // Oxlint checks Astro frontmatter and scripts, not template-specific rules.
      // The lint:astro tasks retain template diagnostics through astro check.
      files: ["www/**/*.astro", "examples/minimal-astro/**/*.astro"],
      env: { astro: true, browser: true, node: true },
    },
    {
      files: ["scripts/**/*"],
      rules: {
        "no-console": "off",
      },
    },
    {
      // Test files are idiomatically long and use async callbacks
      // without await, so these pedantic rules only add noise here.
      files: ["packages/*/test/**/*"],
      rules: {
        "eslint/max-lines": "off",
        "eslint/max-lines-per-function": "off",
        "eslint/require-await": "off",
        "typescript/require-await": "off",
      },
    },
  ],
});
