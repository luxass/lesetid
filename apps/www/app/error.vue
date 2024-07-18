<script setup lang="ts">
useHead({
  title: "lesetid | playground",
});

useSeoMeta({
  description: "A playground for lesetid",
  ogTitle: "lesetid | playground",
  ogDescription: "A playground for lesetid",
});
</script>

<template>
  <div class="flex h-dvh flex-col items-center justify-center gap-4">
    <h1 class="text-8xl text-blue-600">
      404
    </h1>
    <p class="mb-8 text-2xl">
      Page not found
    </p>
    <NuxtLink href="/">
      Go back
    </NuxtLink>
  </div>
</template>
