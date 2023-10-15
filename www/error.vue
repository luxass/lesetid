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
  <div class="h-100dvh flex gap-4 flex-col items-center justify-center">
    <h1 class="text-8xl text-blue-500">
      404
    </h1>
    <p class="mb-8 text-2xl">
      Page not found
    </p>
    <Link href="/">
      Go back
    </Link>
  </div>
</template>
