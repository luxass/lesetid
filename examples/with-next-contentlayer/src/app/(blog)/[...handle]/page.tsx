import { notFound } from "next/navigation";
import React from "react";
import type { Metadata } from "next/types";
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
  const post = allPosts.find((post) => post.url === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogUrl = `https://image.luxass.dev/api/image/post?input=${encodeURIComponent(
    JSON.stringify({
      title: post.title,
      description: post.description,
      date: post.date,
    }),
  )}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://next-example.lesetid.dev/${post.url}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    handle: post.url.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose tracking-wide">
      {
        !post.published && (
          <Notification type="important">
            This post is a
            {" "}
            <strong>draft</strong>
            . It may be incomplete or contain
            inaccuracies.
          </Notification>
        )
      }

      <Notification type="note">
        This post will approximately take
        {" "}
        <strong>{post.estimation}</strong>
        {" "}
        to read.
      </Notification>
      <h1 className="mt-8">{post.title}</h1>
      <MDXContent code={post.body.code} />
    </article>
  );
}
