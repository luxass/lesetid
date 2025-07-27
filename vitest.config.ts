import { existsSync, readdirSync } from "node:fs";
import { normalize } from "node:path";
import { defineConfig, type TestProjectConfiguration } from "vitest/config";

const pkgRoot = (pkg: string) =>
  new URL(`./packages/${pkg}`, import.meta.url).pathname;
const alias = (pkg: string) => `${pkgRoot(pkg)}/src`;

const dirUrl = new URL("./packages", import.meta.url).pathname
console.error("Packages directory:", dirUrl);

const aliases = readdirSync(normalize(dirUrl))
  .filter((dir) => existsSync(normalize(pkgRoot(dir) + "/package.json")))
  .reduce<Record<string, string>>(
    (acc, pkg) => {
      acc[pkg] = alias(pkg);
      return acc;
    },
    {});

console.error("Aliases:", aliases);

const packageProjects = readdirSync(dirUrl)
  .filter((dir) => existsSync(normalize(pkgRoot(dir) + "/package.json")))
  .map((dir) => {
    return {
      extends: true,
      test: {
        include: [`./packages/${dir}/**/*.{test,spec}.?(c|m)[jt]s?(x)`],
        name: dir,
      }
    } satisfies TestProjectConfiguration;
  });

console.error("Package projects:", packageProjects);

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["**/src/**"],
    },
    environment: "node",
    mockReset: true,
    projects: packageProjects
  },
  esbuild: { target: "es2020" },
  resolve: { alias: aliases },
})
