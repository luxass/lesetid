import process from "node:process";
import {
  parseAsync,
} from "valibot";
import type { Example } from "~/types/example";

export default defineEventHandler(async () => {
  const data = await $fetch("https://api.github.com/repos/luxass/lesetid/contents/examples", {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const examplesOutput = await parseAsync(ExamplesSchema, data);

  const _examples: (Example | undefined)[] = await Promise.all(examplesOutput.filter((example) => example.type === "dir").map(async (example) => {
    try {
      const response = await $fetch(`/api/examples/${example.name}`);
      return response;
    } catch (error) {
      console.error(`Error loading example ${example.name}: ${error}`);
    }
  }));
  const examples: Example[] = _examples.filter((example): example is Example => example !== undefined);

  return examples;
});
