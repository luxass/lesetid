import path from "node:path";

export async function getTexts() {
  const fileObjects = Object.values(import.meta.glob("../texts/*.md", { eager: true }));

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

    const dirname = path.dirname(fileModule.file);

    return {
      file: fileModule.file.replace(`${dirname}/`, ""),
      content: fileModule.rawContent(),
    };
  }));

  return files.filter((file): file is { file: string; content: string } => file !== null);
}
