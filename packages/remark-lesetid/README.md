# 📖 remark-lesetid

```sh
npm install remark-lesetid
```

## 📚 Usage

```ts
import remarkLesetid from "remark-lesetid";
```

### Astro

Astro support is builtin and provided via the [`astro`](https://astro.build) specific export.

```ts
import remarkLesetid from "remark-lesetid/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkLesetid]
  },
});
```

## 📄 License

Published under [MIT License](./LICENSE).
