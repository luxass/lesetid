import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

export function getMDXFiles(dir: string) {
  return readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const content = readFileSync(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata: matter(content).data as {
        title: string;
        date: string;
        description: string;
        published: boolean;
      },
      slug,
      content,
    };
  });
}

export type Post = ReturnType<typeof getMDXData>[number];

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "content"));
}
