import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/stream.ts", "./src/utils.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  treeshake: true,
  exports: true,
  publint: true,
});
