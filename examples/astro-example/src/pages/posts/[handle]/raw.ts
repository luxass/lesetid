import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET({ url }: APIContext) {
  const posts = await getCollection(
    "posts",
    ({ data, slug }) =>
      data.published
      && (data.handle || slug)
      === url.pathname.replace("/raw", "").split("/").pop(),
  );

  if (!posts || !posts.length) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  const post = posts[0];

  return new Response(post.body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=UTF-8",
    },
  });
}
