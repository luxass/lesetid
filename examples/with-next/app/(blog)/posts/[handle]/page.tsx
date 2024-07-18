import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { Estimation } from "remark-lesetid";
import remarkLesetid from "remark-lesetid";
import type { Metadata } from "next";
import { getBlogPosts } from "../../../../lib/content";

interface PostPageProps {
  params: {
    handle: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getBlogPosts().find((post) => post.slug === params.handle);

  if (!post) {
    return {};
  }

  const ogUrl = `https://image.luxass.dev/api/image/post?input=${encodeURIComponent(
    JSON.stringify({
      title: post.metadata.title,
      description: post.metadata.description,
      date: post.metadata.date,
    }),
  )}`;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      url: `https://next-example.lesetid.dev/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return getBlogPosts().map((post) => ({
    handle: post.slug,
  }));
}

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
          [rehypePrettyCode, {
            theme: "vitesse-light",
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
    <article className="markdown prose tracking-wide">
      <div className="gap-3 rounded border border-neutral-300 p-3">
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
