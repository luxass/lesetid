import type { Example } from "./schemas";
import { GITHUB_TOKEN } from "astro:env/server";
import { EXAMPLE_SCHEMA, EXAMPLES_GITHUB_RESPONSE_SCHEMA } from "./schemas";

export async function getExamples(): Promise<Example[]> {
  const res = await fetch("https://api.github.com/repos/luxass/lesetid/contents/examples", {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  const result = await EXAMPLES_GITHUB_RESPONSE_SCHEMA.safeParseAsync(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const examples: Example[] = [];

  for (const example of result.data) {
    if (example.type === "dir") {
      try {
        const exampleResponse = await fetch(
          `https://api.github.com/repos/luxass/lesetid/contents/examples/${example.name}/.lesetid/example.json`,
          {
            headers: {
              "User-Agent": "lesetid.dev",
              "X-GitHub-Api-Version": "2022-11-28",
              "Authorization": `Bearer ${GITHUB_TOKEN}`,
            },
          },
        );

        if (!exampleResponse.ok) {
          continue;
        }

        const exampleContent = await exampleResponse.json();

        if (!exampleContent?.content || typeof exampleContent.content !== "string") {
          continue;
        }

        const parsed = await EXAMPLE_SCHEMA.safeParseAsync(
          JSON.parse(atob(exampleContent.content)),
        );

        if (!parsed.success) {
          continue;
        }

        const exampleObj = parsed.data;
        exampleObj.iconUrl = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example.name}/.lesetid${exampleObj.iconUrl}`;
        examples.push(exampleObj);
      } catch (error) {
        console.error(`Error loading example ${example.name}:`, error);
      }
    }
  }

  return examples;
}
