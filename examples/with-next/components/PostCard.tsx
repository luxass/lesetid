import Link from "next/link"
import type { Post } from "../lib/content"

export interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.metadata.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/posts/${post.slug}`} className="flex flex-col justify-between h-36 border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 rounded p-3 gap-3">
      <span className="text-lg font-semibold">{post.metadata.title}</span>
      <div className="flex-grow">
        <span className="line-clamp-2">{post.metadata.description}</span>
      </div>
      <span>{formattedDate}</span>
    </Link>
  )
}
