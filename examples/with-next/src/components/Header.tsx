import Link from "next/link"
import { allPosts } from "~/contentlayer"

export function Header() {
  const posts = allPosts.filter((post) => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)
  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between">
        <Link href="/" className="transition-transform active:scale-95">
          NextJS Example
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {posts.map((post) => (
            <Link className="transition-transform active:scale-95" href={post.url} key={post._id}>
              {post.shortTitle}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
