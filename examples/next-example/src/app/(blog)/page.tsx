import { PostCard } from "~/components/PostCard";
import { allPosts } from "~/contentlayer";

export default function IndexPage() {
  const posts = allPosts.filter((post) => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <>
      <h1>Posts</h1>
      <p>This is a blog</p>
      <article>
        {
          posts.length > 0
            ? (
              <ul className="grid auto-cols-max grid-cols-1 mt-4 gap-4 sm:grid-cols-2 sm:gap-3">
                {posts.map((post) => (
                  <li key={post._id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
              )
            : (
              <p>I didn&apos;t write any public available posts yet.</p>
              )
        }
      </article>
    </>
  );
}