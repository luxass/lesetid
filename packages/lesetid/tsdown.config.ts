import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/stream.ts", "./src/utils.ts"],
  format: ["esm", "cjs"],
  clean: true,
  dts: true,
  treeshake: true,
  exports: {
    enabled: "local-only",
  },
  publint: true,
  tsconfig: "./tsconfig.build.json",
});
