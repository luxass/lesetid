<script setup lang="ts">
import type { ContentWithEstimation } from "~/types";

const posts = await queryContent<ContentWithEstimation>()
  .sort({
    date: 1,
  }).find();

useHead({
  title: "posts | nuxt-example.lesetid.dev",
});
</script>

<template>
  <article>
    <h1 class="text-2xl mt-8 mb-6">
      Posts
    </h1>
    <p>Welcome to my blog, this is where i'm writing about things i find interesting.</p>
    <div v-if="posts.length > 0" class="grid auto-cols-max grid-cols-1 mt-4 gap-4 sm:grid-cols-2 sm:gap-3">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
    <p v-else>
      No public posts available yet.
    </p>
  </article>
</template>
