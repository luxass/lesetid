import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import remarkLesetid, { type Estimation } from "remark-lesetid";
import { getBlogPosts } from "../../../../lib/content";

interface PostPageProps {
  params: {
    handle: string;
  };
}

// export async function generateMetadata({
//   params,
// }: PostPageProps): Promise<Metadata> {
//   const post = await getPostFromParams(params)

//   if (!post) {
//     return {}
//   }

//   const ogUrl = `https://image.luxass.dev/api/image/post?input=${encodeURIComponent(
//     JSON.stringify({
//       title: post.title,
//       description: post.description,
//       date: post.date,
//     }),
//   )}`

//   return {
//     title: post.title,
//     description: post.description,
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       type: "article",
//       url: `https://next-example.lesetid.dev/${post.url}`,
//       images: [
//         {
//           url: ogUrl.toString(),
//           width: 1200,
//           height: 630,
//           alt: post.title,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.description,
//       images: [ogUrl.toString()],
//     },
//   }
// }

// export async function generateStaticParams(): Promise<
//   PostPageProps["params"][]
// > {
//   return allPosts.map((post) => ({
//     handle: post.url.split("/"),
//   }))
// }

export default async function PostPage({ params }: PostPageProps) {
  const post = getBlogPosts().find((post) => post.slug === params.handle);

  if (!post) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{ title: string; estimation?: Estimation }>({
    source: post.content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkLesetid,
        ],
        rehypePlugins: [
          rehypeSlug,
          // @ts-expect-error something broke in their types.
          [rehypePrettyCode, {
            theme: "vitesse-dark",
          }],
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
        ],
      },
    },
  });

  return (
    <article className="prose dark:prose-invert markdown tracking-wide">
      <div className="border border-neutral-300 dark:border-neutral-700 rounded p-3 gap-3">
        This post will approximately take
        {" "}
        <strong>{frontmatter.estimation?.text || "NaN"}</strong>
        {" "}
        to read.
      </div>
      <h1 className="mt-8">{post.metadata.title}</h1>
      {content}
    </article>
  );
}
