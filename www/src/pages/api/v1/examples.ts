import {
  GITHUB_TOKEN,
} from "astro:env/server";
import {
  type Example,
  EXAMPLE_SCHEMA,
  EXAMPLES_GITHUB_RESPONSE_SCHEMA,
} from "../../../lib/schemas";

export async function GET() {
  const res = await fetch("https://api.github.com/repos/luxass/lesetid/contents/examples", {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    return new Response(res.statusText, { status: res.status });
  }

  const data = await res.json();

  const result = await EXAMPLES_GITHUB_RESPONSE_SCHEMA.safeParseAsync(data);

  if (!result.success) {
    return new Response(result.error.message, { status: 500 });
  }

  const examples: Example[] = [];

  for (const example of result.data) {
    if (example.type === "dir") {
      try {
        const exampleResponse = await fetch(`https://api.github.com/repos/luxass/lesetid/contents/examples/${example.name}/.lesetid/example.json`, {
          headers: {
            "User-Agent": "lesetid.dev",
            "X-GitHub-Api-Version": "2022-11-28",
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
          },
        });

        if (!exampleResponse.ok) {
          return new Response(exampleResponse.statusText, { status: exampleResponse.status });
        }

        const exampleContent = await exampleResponse.json();

        if (!exampleContent || typeof exampleContent !== "object") {
          return new Response("Invalid example content", { status: 500 });
        }

        if (!("content" in exampleContent) || typeof exampleContent.content !== "string") {
          return new Response("Invalid example content", { status: 500 });
        }

        const result = await EXAMPLE_SCHEMA.safeParseAsync(JSON.parse(atob(exampleContent.content)));

        if (!result.success) {
          return new Response(result.error.message, { status: 500 });
        }

        const exampleObj = result.data;

        exampleObj.iconUrl = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example.name}/.lesetid${exampleObj.iconUrl}`;

        examples.push(exampleObj);
      } catch (error) {
        console.error(`Error loading example ${example.name}:`, error);
      }
    }
  }

  return new Response(JSON.stringify(examples), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
