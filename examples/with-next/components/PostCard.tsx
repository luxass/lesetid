import Link from "next/link";
import type { Post } from "../lib/content";

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.metadata.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex max-w-sm cursor-pointer flex-col gap-2 rounded-md border border-neutral-300 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-neutral-400"
    >
      <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
        <p>{post.metadata.title}</p>
        <div className="flex flex-row items-center gap-4">
          <p>{formattedDate}</p>

          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-all duration-300 group-hover:translate-x-1">
            <path d="M5.25 12.75L12.75 5.25" stroke="#999999" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M5.25 5.25H12.75V12.75" stroke="#999999" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      <p className="truncate">
        {post.metadata.description}
      </p>
    </Link>
  );
}
