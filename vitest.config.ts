import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { defineConfig, type TestProjectConfiguration } from "vitest/config";

// fileURLToPath (not .pathname) so paths are valid on Windows too.
const pkgRoot = (pkg: string) => fileURLToPath(new URL(`./packages/${pkg}`, import.meta.url));
const alias = (pkg: string) => `${pkgRoot(pkg)}/src`;

const dirUrl = fileURLToPath(new URL("./packages", import.meta.url));

const aliases = readdirSync(dirUrl)
  .filter((dir) => existsSync(pkgRoot(dir) + "/package.json"))
  .reduce<Record<string, string>>((acc, pkg) => {
    acc[pkg] = alias(pkg);
    return acc;
  }, {});

const packageProjects = readdirSync(dirUrl)
  .filter((dir) => existsSync(pkgRoot(dir) + "/package.json"))
  .map((dir) => {
    return {
      extends: true,
      test: {
        include: [`./packages/${dir}/**/*.{test,spec}.?(c|m)[jt]s?(x)`],
        name: dir,
      },
    } satisfies TestProjectConfiguration;
  });

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["**/src/**"],
    },
    environment: "node",
    mockReset: true,
    projects: packageProjects,
  },
  esbuild: { target: "es2020" },
  resolve: { alias: aliases },
});
