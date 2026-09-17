# 📖 lesetid

`/leːsətiːd/`, Norwegian: "lesetid"

## ✨ Features

- ESM Support
- Tree Shakeable
- Using `CPM` (Characters Per Minute) to estimate for CJK languages
- Streaming support
- Implements [Medium's reading time algorithm](https://help.medium.com/hc/en-us/articles/214991667-Read-time).

## 📦 Installation

```sh
npm install lesetid
```

## 📚 Usage

```ts
import { estimate } from "lesetid";

const { minutes, rawMinutes, words } = estimate("Hello World!");
```

or you can use the streaming approach

```ts
import { Readable } from "node:stream";
import { createReadingTimeStream } from "lesetid/stream";

const readingTimeStream = await fetch("https://next.luxass.dev/projects/eslint-config/raw")
  .then((res) =>
    Readable.from(res.body, {
      encoding: "utf-8",
    }),
  )
  .then((body) => body.pipe(createReadingTimeStream()));

readingTimeStream.on("data", (data) => {
  console.info(data);
});
```

## 🙌 Acknowledgements

I would like to thank [ngryman](https://github.com/ngryman) for his work on [reading-time](https://github.com/ngryman/reading-time) which inspired me to create this package.

## 📄 License

Published under [MIT License](./LICENSE).
