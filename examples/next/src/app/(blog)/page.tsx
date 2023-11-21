import { PostCard } from "~/components/PostCard";
import { allPosts } from "~/contentlayer";

export default function IndexPage() {
  const posts = allPosts.filter((post) => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <>
      <h1 className="my-8 mb-6 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Posts</h1>
      <article>
        {
          posts.length > 0
            ? (
              <ul className="mt-4 grid auto-cols-max grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
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
