<script setup lang="ts">
const posts = await queryContent().sort({ createdAt: -1 }).find();
</script>

<template>
  <h1>Posts</h1>
  <p>This is a blog</p>
  <article>
    <ul v-if="posts.length > 0" class="grid auto-cols-max grid-cols-1 mt-4 gap-4 sm:grid-cols-2 sm:gap-3">
      <li v-for="post in posts" :key="post._id">
        <PostCard :post="post" />
      </li>
    </ul>
    <p v-else>
      I didn&apos;t write any public available posts yet.
    </p>
  </article>
</template>
