# 📖 lesetid

`/leːsətiːd/`, Norwegian: "lesetid"

## 📦 Installation

```sh
npm install lesetid
```

## 📚 Usage

```ts
import { readingTime } from "lesetid";

const {
  minutes,
  rawMinutes,
  words
} = readingTime("Hello World!");
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

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev`

Published under [MIT License](./LICENCE).
