# lesetid

📖 A dead simple read time estimation

## Table of Contents

This repository contains the packages, docs and examples for lesetid

- [lesetid](https://github.com/luxass/lesetid/tree/main/packages/lesetid) - the
  core package for calculating reading time
- [remark-lesetid](https://github.com/luxass/lesetid/tree/main/packages/remark-lesetid) - a
  remark plugin for calculating reading time
- [Playground Site](https://github.com/luxass/lesetid/tree/main/www) - Source
  for lesetid.dev
- [Next.JS](https://github.com/luxass/lesetid/tree/main/examples/nextjs) -
  A simple example using [Next.js](https://nextjs.org)
- [Astro](https://github.com/luxass/lesetid/tree/main/examples/minimal-astro) -
  A simple example using [Astro](https://astro.build)

[Report an Issue](https://github.com/luxass/lesetid/issues/new)

## Development checks

After `sfw pnpm install`, use `pnpm lint` or `pnpm lint:fix` for Oxlint.
Use `pnpm fmt` or `pnpm fmt:check` for Oxfmt.
These root commands cover packages, examples, tooling, scripts, and root configuration files.
Each workspace also provides these commands for local use and Turbo tasks.

Oxlint checks JavaScript, TypeScript, JSX, TSX, and the script sections of Astro files.
The Next.js example also enables React, Next.js, and JSX accessibility rules.
Both Astro workspaces run `astro check` during linting to retain template diagnostics.
Astro-specific ESLint rules and UnoCSS lint rules have no direct replacement in this configuration.

Oxfmt handles supported code, JSON, YAML, CSS, Markdown, and MDX files.
Oxfmt 0.72 does not format Astro, SVG, or XML files.
These formats are explicitly excluded and need manual formatting.
Generated files, build outputs, caches, and the lockfile are also excluded.

Package tooling uses TypeScript 7. Astro and Next.js retain TypeScript 6 because their tools use its compiler API.

The workspace and published packages require Node.js 24.11.0 or later.
Use the latest Node.js 24 release for development.
Run `pnpm test`, `pnpm typecheck`, and `pnpm build:all` after installation to check the migration.

## 📄 License

Published under [MIT License](./LICENSE).
