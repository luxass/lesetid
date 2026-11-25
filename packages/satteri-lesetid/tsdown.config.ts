import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm"],
  target: "node22",
  clean: true,
  dts: true,
  treeshake: true,
  exports: {
    enabled: "local-only",
  },
  deps: {
    // Keep dependencies external in JavaScript and declaration files.
    neverBundle: true,
  },
  publint: true,
  tsconfig: "./tsconfig.build.json",
});
