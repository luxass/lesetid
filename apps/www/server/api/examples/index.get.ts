import process from "node:process";
import { parseAsync } from "valibot";
import type { Example } from "../../../types/example";

export default defineEventHandler(async () => {
  const data = await $fetch("https://api.github.com/repos/luxass/lesetid/contents/examples", {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const examplesOutput = await parseAsync(ExamplesSchema, data);

  const examples: Example[] = [];

  for (const example of examplesOutput) {
    if (example.type === "dir") {
      try {
        const response = await $fetch<Example>(`/api/examples/${example.name}`);
        examples.push(response);
      } catch (error) {
        console.error(`Error loading example ${example.name}:`, error);
      }
    }
  }

  return examples;
});
