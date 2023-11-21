import {
  defineConfig,
} from "tsup";

export default defineConfig((opts) => [
  {
    entry: ["./src/extension.ts"],
    format: ["cjs"],
    clean: true,
    treeshake: true,
    bundle: true,
    target: ["es2020", "node16"],
    platform: "node",
    minify: !opts.watch,
    external: ["vscode"],
  },
  {
    entry: ["./src/extension.ts"],
    outDir: "dist/web",
    format: ["cjs"],
    clean: true,
    treeshake: true,
    bundle: true,
    target: ["es2020", "chrome91"],
    platform: "browser",
    minify: !opts.watch,
    external: ["vscode"],
  },
]);
