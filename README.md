# 📖 lesetid

`/leːsətiːd/`, Norwegian: "lesetid"

## ✨ Features

- ESM Support
- Tree Shakeable
- Using `CPM` (Characters Per Minute) to estimate for CJK languages
- Streaming support

## 📦 Installation

```sh
pnpm install lesetid
```

## 📚 Usage

```ts
import { estimate } from "lesetid";

const {
  minutes,
  rawMinutes,
  words
} = estimate("Hello World!");
```

or you can use the streaming approach

```ts
import { Readable } from "node:stream";
import { createReadingTimeStream } from "lesetid/stream";

const readingTimeStream = await fetch("https://next.luxass.dev/projects/eslint-config/raw")
  .then((res) => Readable.from(res.body, {
    encoding: "utf-8",
  }))
  .then((body) => body.pipe(createReadingTimeStream()));

readingTimeStream.on("data", (data) => {
  console.info(data);
});
```

## 🙌 Acknowledgements
I would like to thank [ngryman](https://github.com/ngryman) for his work on [reading-time](https://github.com/ngryman/reading-time) which inspired me to create this package.


## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev`

Published under [MIT License](./LICENSE).
