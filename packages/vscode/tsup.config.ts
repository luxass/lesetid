import {
  defineConfig,
} from "tsup";

export default defineConfig((opts) => ({
  entry: ["./src/extension.ts"],
  format: ["cjs"],
  clean: true,
  treeshake: true,
  bundle: true,
  minify: !opts.watch,
  external: ["vscode"],
}));
