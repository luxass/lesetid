import { type Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { allPosts } from "~/contentlayer";
import { MDXContent } from "~/components/mdx/MDXComponents";
import {
  Notification,
} from "~/components/Notification";

interface PostPageProps {
  params: {
    handle: string[]
  }
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.handle?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

// export async function generateMetadata({
//   params,
// }: PostPageProps): Promise<Metadata> {
//   const post = await getPostFromParams(params);

//   if (!post) {
//     return {};
//   }

//   const url = env.NEXT_PUBLIC_APP_URL ?? "localhost:3000";

//   const ogUrl = new URL(`${url}/api/og`);
//   ogUrl.searchParams.set("heading", post.title);
//   ogUrl.searchParams.set("type", "Blog Post");
//   ogUrl.searchParams.set("mode", "dark");

//   return {
//     title: post.title,
//     description: post.description,
//     authors: post.authors.map((author) => ({
//       name: author,
//     })),
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       type: "article",
//       url: absoluteUrl(post.slug),
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
//   };
// }

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    handle: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="prose tracking-wide">
      {
        !post.published && (
          <Notification type="important">
            This post is a <strong>draft</strong>. It may be incomplete or contain
            inaccuracies.
          </Notification>
        )
      }

      <Notification type="note">
        This post will approximately take <strong>{"remarkPluginFrontmatter.estimation.text"}</strong> to read.
      </Notification>
      <h1 className="mt-8">{post.title}</h1>
      <MDXContent code={post.body.code} />
    </div>
  );
}
