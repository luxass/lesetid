import { PostCard } from "../../components/PostCard"
import { getBlogPosts } from "../../lib/content"

export default function IndexPage() {
  const posts = getBlogPosts().filter((post) => post.metadata.published).sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())

  return (
    <article className="prose">
      <h1>Posts</h1>
      {
        posts.length > 0
          ? (
            <div className="grid auto-cols-max grid-cols-1 mt-4 gap-4 sm:grid-cols-2 sm:gap-3">
              {posts.map((post, idx) => (
                <PostCard post={post} key={`post-${idx}`} />
              ))}
            </div>
            )
          : (
            <p>No public posts available yet.</p>
            )
      }
    </article>
  )
}
