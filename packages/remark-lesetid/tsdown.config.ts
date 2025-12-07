import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/astro.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  treeshake: true,
  exports: {
    enabled: "local-only",
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
  },
  tsconfig: "./tsconfig.build.json",
});
