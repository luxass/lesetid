# 📖 remark-lesetid

```sh
pnpm install remark-lesetid
```

## 📚 Usage

```ts
import { remarkLesetid } from "remark-lesetid"
```

we are also providing an export to directly hook into [`astro`](https://astro.build).

```ts
import { remarkLesetid } from "remark-lesetid/astro"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkLesetid]
  },
})
```

## 📄 License

Published under [MIT License](./LICENSE).
