import type { Input } from "valibot";
import { array, literal, merge, object, optional, parseAsync, startsWith, string, union } from "valibot";

const requestHeaders = {
  "User-Agent": "lesetid.dev",
  "X-GitHub-Api-Version": "2022-11-28",
};

const ICON_URL_SCHEMA = string([
  startsWith("/"),
]);

const ExampleFileSchema = object({
  iconUrl: optional(union([
    ICON_URL_SCHEMA,
    object({
      dark: ICON_URL_SCHEMA,
      light: ICON_URL_SCHEMA,
    }),
  ])),
  title: string(),
  url: string(),
  stackblitz: string(),
  codesandbox: string(),
  codespaces: string(),
});

const ExampleSchema = merge([ExampleFileSchema, object({
  key: string(),
})]);

const ExamplesSchema = array(object({
  name: string(),
  path: string(),
  url: string(),
  html_url: string(),
  type: union([
    literal("dir"),
    literal("file"),
  ]),
}));

type Example = Input<typeof ExampleSchema>;

export default defineEventHandler(async () => {
  const examples: Example[] = [];
  const data = await $fetch("https://api.github.com/repos/luxass/lesetid/contents/examples", {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const examplesOutput = await parseAsync(ExamplesSchema, data);

  await Promise.all(examplesOutput.filter((example) => example.type === "dir").map(async (example) => {
    const exampleContent = await $fetch(`https://api.github.com/repos/luxass/lesetid/contents/examples/${example.name}/.lesetid/example.json`, {
      headers: requestHeaders,
    });

    if (!exampleContent || typeof exampleContent !== "object") {
      return;
    }

    if (!("content" in exampleContent) || typeof exampleContent.content !== "string") {
      return;
    }

    const exampleObj = await parseAsync(ExampleFileSchema, JSON.parse(atob(exampleContent.content)));
    if (typeof exampleObj.iconUrl === "object") {
      exampleObj.iconUrl.dark = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example.name}/.lesetid${exampleObj.iconUrl.dark}`;
      exampleObj.iconUrl.light = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example.name}/.lesetid${exampleObj.iconUrl.light}`;
    } else {
      exampleObj.iconUrl = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example.name}/.lesetid${exampleObj.iconUrl}`;
    }

    examples.push(Object.assign(exampleObj, {
      key: example.name.replace("-example", ""),
    }));
  }));

  return examples;
});
