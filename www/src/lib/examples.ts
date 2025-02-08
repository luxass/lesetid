import type { Example } from "./schemas";
import { readdir, readFile } from "node:fs/promises";
import { EXAMPLE_SCHEMA } from "./schemas";

export async function getExamples(): Promise<Example[]> {
  const files = await readdir("../examples", { withFileTypes: true });

  const examples: Example[] = [];

  for (const example of files.filter((file) => file.isDirectory())) {
    try {
      const exampleFile = await readFile(`../examples/${example.name}/.lesetid/example.json`, "utf-8");

      if (exampleFile == null) {
        continue;
      }

      const parsed = EXAMPLE_SCHEMA.parse(JSON.parse(exampleFile));

      parsed.iconUrl = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example.name}/.lesetid${parsed.iconUrl}`;
      examples.push(parsed);
    } catch (error) {
      console.error(`Error loading example ${example.name}:`, error);
    }
  }

  return examples;
}
