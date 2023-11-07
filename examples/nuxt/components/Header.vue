<script setup lang="ts">
const { data: posts } = await useAsyncData(
  () => queryContent().limit(3).sort({ createdAt: -1 }).find(),
);
</script>

<template>
  <header>
    <nav class="flex flex-wrap items-center justify-between">
      <NuxtLink href="/" class="transition-transform active:scale-95">
        Nuxt Example
      </NuxtLink>

      <div className="flex items-center gap-4 sm:gap-6">
        <NuxtLink v-for="post in posts" :key="post._id" class="transition-transform active:scale-95" :href="post._path">
          {{ post.shortTitle }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
