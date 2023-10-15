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
import { createReadingTimeStream } from "lesetid/stream";

fetch("https://luxass.dev/projects/eslint-config/raw")
  .then((res) => res.body.pipe(createReadingTimeStream()))
  .then((res) => {
    const {
      minutes,
      rawMinutes,
      words
    } = res;

    console.log("Reading time:", minutes, "minutes");
  });
```

## credits
> Credit is given where credit is due. 

This project is heavily inspired by [reading-time](https://github.com/ngryman/reading-time).


## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev`

Published under [MIT License](./LICENSE).
