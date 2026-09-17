import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/astro.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  treeshake: true,
  exports: {
    enabled: "local-only",
    // Keep package.json versions managed by pnpm catalogs;
    // tsdown would otherwise write exact versions here on every build.
    inlinedDependencies: false,
  },
  deps: {
    // Ensure that dependencies are treated as external in the JavaScript
    // output. `unified` and `mdast` stay external for type declarations
    // as well, while the remaining types are bundled so consumers
    // don't need them installed.
    neverBundle: true,
    dts: {
      neverBundle: ["unist", "mdast"],
    },
  },
  publint: true,
  footer(ctx) {
    if (ctx.format === "cjs") {
      return {
        // This will ensure we can continue writing this plugin
        // as a modern ECMA module, while still publishing this as a CommonJS
        // library with a default export, as that's how ESLint expects plugins to look.
        // @see https://github.com/evanw/esbuild/issues/1182#issuecomment-1011414271
        js: "module.exports = module.exports.default;",
      };
    }
    return undefined;
  },
  tsconfig: "./tsconfig.build.json",
});
