<script setup lang="ts">
import type { CustomParsedContent } from "~/types"

const posts = await queryContent<CustomParsedContent>().sort({ createdAt: -1 }).find()
</script>

<template>
  <article class="prose">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="grid auto-cols-max grid-cols-1 mt-4 gap-4 sm:grid-cols-2 sm:gap-3">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
    <p v-else>
      I didn&apos;t write any public available posts yet.
    </p>
  </article>
</template>
