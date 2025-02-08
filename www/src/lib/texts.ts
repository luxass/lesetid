import { join } from "node:path";

export async function getTexts() {
  // eslint-disable-next-line no-console
  console.log("BEFORE");
  const fileObjects = Object.values(import.meta.glob("../texts/*.md", { eager: true }));
  // eslint-disable-next-line no-console
  console.log("AFTER 1");
  const files = await Promise.all(fileObjects.map(async (fileModule) => {
    if (
      fileModule == null
      || typeof fileModule !== "object"
      || (!("file" in fileModule) || typeof fileModule.file !== "string")
      || (!("rawContent" in fileModule) || typeof fileModule.rawContent !== "function")
    ) {
      return null;
    }

    if (fileModule.file.endsWith("README.md")) {
      return null;
    }

    // eslint-disable-next-line no-console
    console.log("FILE", fileModule);

    return {
      file: fileModule.file.replace(join(import.meta.dirname, "../texts/"), ""),
      content: fileModule.rawContent(),
    };
  }));

  // eslint-disable-next-line no-console
  console.log("FILES", files);

  return files.filter((file): file is { file: string; content: string } => file !== null);
}
