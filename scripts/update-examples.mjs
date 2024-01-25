import {
  exit,
} from "node:process"

import { readFile, readdir, writeFile } from "node:fs/promises"

async function run() {
  const exampleFolders = await readdir("./examples", {
    withFileTypes: true,
  })

  const exampleNames = exampleFolders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  await Promise.all(exampleNames.map(async (exampleName) => {
    const exampleConfig = await readFile(`./examples/${exampleName}/.lesetid/example.json`, {
      encoding: "utf-8",
    })

    if (!exampleConfig) {
      throw new Error(`No example config found for ${exampleName}`)
    }

    const exampleConfigParsed = JSON.parse(exampleConfig)

    const readme = await readFile(`./examples/${exampleName}/README.md`, {
      encoding: "utf-8",
    })

    const providersStart = readme.indexOf("<!-- providers:start -->")

    const providersEnd = readme.indexOf("<!-- providers:end -->")

    const readmeLinks = readme.slice(providersStart, providersEnd + "<!-- providers:end -->".length)

    let newReadmeLinks = "<!-- providers:start -->\n"

    newReadmeLinks += Object.entries(exampleConfigParsed.providers).map(([provider, providerLink]) => {
      if (!providerLink) {
        throw new Error(`Missing provider config for ${provider} in ${exampleName}`)
      }

      return `[${provider}]: ${providerLink}`
    }).join("\n")

    newReadmeLinks += "\n<!-- providers:end -->"

    await writeFile(`./examples/${exampleName}/README.md`, readme.replace(readmeLinks, newReadmeLinks))
    console.log(`updated \`README\` for ${exampleName}`)
  }))
}

run().catch((err) => {
  console.error(err)
  exit(1)
})
