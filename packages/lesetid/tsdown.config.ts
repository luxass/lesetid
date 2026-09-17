import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/stream.ts", "./src/utils.ts"],
  format: ["esm", "cjs"],
  clean: true,
  dts: true,
  treeshake: true,
  exports: {
    enabled: "local-only",
    // Keep package.json versions managed by pnpm catalogs;
    // tsdown would otherwise write exact versions here on every build.
    inlinedDependencies: false,
  },
  publint: true,
  tsconfig: "./tsconfig.build.json",
});
