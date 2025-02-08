import { join } from "node:path";

export async function GET() {
  const fileObjects = Object.values(import.meta.glob("../../../texts/*.md", { eager: true }));

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

    return {
      file: fileModule.file.replace(join(import.meta.dirname, "../../../texts/"), ""),
      content: fileModule.rawContent(),
    };
  }));

  return new Response(JSON.stringify(files.filter(Boolean)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
