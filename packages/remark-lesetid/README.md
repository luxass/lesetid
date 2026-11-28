# 📖 remark-lesetid

```sh
npm install remark-lesetid
```

## 📚 Usage

```ts
import remarkLesetid from "remark-lesetid";
```

### Astro

Astro 7 renders Markdown with Sätteri by default. For the default processor, use [`satteri-lesetid`](https://github.com/luxass/lesetid/tree/main/packages/satteri-lesetid).

To keep the remark pipeline, install `@astrojs/markdown-remark` and pass the `astro` export to its `unified()` processor:

```ts
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import remarkLesetid from "remark-lesetid/astro";

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [remarkLesetid],
    }),
  },
});
```

## 📄 License

Published under [MIT License](./LICENSE).
