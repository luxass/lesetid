import process from "node:process"
import { parseAsync } from "valibot"

export default defineEventHandler(async (event) => {
  if (!event.context.params) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }

  const { example } = event.context.params
  if (!example) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }

  if (example === "with-astro") {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }

  const exampleContent = await $fetch(`https://api.github.com/repos/luxass/lesetid/contents/examples/${example}/.lesetid/example.json`, {
    headers: {
      "User-Agent": "lesetid.dev",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })

  if (!exampleContent || typeof exampleContent !== "object") {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }
  if (!("content" in exampleContent) || typeof exampleContent.content !== "string") {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }

  const exampleObj = await parseAsync(ExampleSchema, JSON.parse(atob(exampleContent.content)))
  if (typeof exampleObj.iconUrl === "object") {
    exampleObj.iconUrl.dark = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example}/.lesetid${exampleObj.iconUrl.dark}`
    exampleObj.iconUrl.light = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example}/.lesetid${exampleObj.iconUrl.light}`
  } else {
    exampleObj.iconUrl = `https://raw.githubusercontent.com/luxass/lesetid/main/examples/${example}/.lesetid${exampleObj.iconUrl}`
  }

  return exampleObj
})
