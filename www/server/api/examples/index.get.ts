import process from "node:process";
import {
  parseAsync,
} from "valibot";
import type { Example } from "~/types/example";

export default defineEventHandler(async () => {
  const examples: Example[] = [];
  const data = await fetch("https://api.github.com/repos/luxass/lesetid/contents/examples", {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }).then((res) => res.json());

  const examplesOutput = await parseAsync(ExamplesSchema, data);

  await Promise.all(examplesOutput.filter((example) => example.type === "dir").map(async (example) => {
    const response = await $fetch(`/api/examples/${example.name}`);

    if (typeof response === "string") {
      console.error(`Example ${example.name} failed to load`);
      return;
    }
    examples.push(response);
  }));

  return examples;
});
