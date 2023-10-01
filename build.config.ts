import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/index",
    "./src/stream",
  ],
  outDir: "dist",
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
