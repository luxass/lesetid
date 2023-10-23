# 📖 remark-lesetid

```sh
pnpm install remark-lesetid
```

## 📚 Usage

```ts
import { remarkLesetid } from "remark-lesetid";
```

we are also providing an `export` to directly hook into [`astro`](https://astro.build).

```ts
import { remarkLesetid } from "remark-lesetid/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkLesetid]
  },
});
```

## 📖 Examples


## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev`


## 📄 License

Published under [MIT License](./LICENSE).
