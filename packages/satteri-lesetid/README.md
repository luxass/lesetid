# 📖 satteri-lesetid

A [Sätteri](https://github.com/bruits/satteri) plugin that adds the reading time of each Markdown file, estimated with [lesetid](https://github.com/luxass/lesetid/tree/main/packages/lesetid).

```sh
npm install satteri-lesetid
```

## 📚 Usage

```ts
import { markdownToHtml } from "satteri";
import { satteriLesetid } from "satteri-lesetid";

const { data } = await markdownToHtml(markdown, {
  mdastPlugins: [satteriLesetid()],
});

console.log(data.estimation);
// { minutes: 5, time: 290100, words: 967, chars: 0, text: "5 min read" }
```

### Astro

Astro 7 renders Markdown with Sätteri by default. Add the plugin to the Sätteri processor:

```ts
import { satteri } from "@astrojs/markdown-satteri";
import { defineConfig } from "astro/config";
import { satteriLesetid } from "satteri-lesetid";

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      mdastPlugins: [satteriLesetid()],
    }),
  },
});
```

When Astro renders a file, the plugin sets the estimation in the page frontmatter instead of `data`. Read it as `frontmatter.estimation` in a Markdown layout, or as `remarkPluginFrontmatter.estimation` from `render()` in a content collection.

If you use the remark pipeline through `unified()` from `@astrojs/markdown-remark`, use [`remark-lesetid/astro`](https://github.com/luxass/lesetid/tree/main/packages/remark-lesetid) instead.

## ⚙️ Options

`satteriLesetid()` accepts the [lesetid options](https://github.com/luxass/lesetid/tree/main/packages/lesetid), such as `wordsPerMinute` and `charsPerMinute`, and:

| Option    | Default        | Description                                                                  |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| `dataKey` | `"estimation"` | The key that receives the estimation, in the Astro frontmatter or in `data`. |

## 📄 License

Published under [MIT License](./LICENSE).
