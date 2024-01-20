import Link from "next/link"
import type { Post } from "~/contentlayer"
import CarbonCalendar from "~icons/carbon/calendar.jsx"
import CarbonAlarm from "~icons/carbon/alarm.jsx"

export interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTitle = post.title.length > 30 ? `${post.title.slice(0, 30)}...` : post.title
  return (
    <Link href={post.url} className="flex h-full min-h-[9rem] flex-col rounded border border-transparent p-4 text-neutral-800 hover:border-neutral-700 dark:text-neutral-200">
      <h3 className="!my-0">{formattedTitle}</h3>

      <p className="flex-1">{post.description}</p>

      <span className="flex items-center gap-x-1">
        <CarbonCalendar />
        {formattedDate}
      </span>
      <span className="flex items-center gap-x-1">
        <CarbonAlarm />
        {post.estimation || "No estimation"}
      </span>
    </Link>
  )
}
