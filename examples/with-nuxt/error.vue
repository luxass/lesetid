<script setup lang="ts">
useHead({
  title: "nuxt example | lesetid.dev",
})

useSeoMeta({
  description: "A nuxt example for lesetid",
  ogTitle: "nuxt example | lesetid.dev",
  ogDescription: "A nuxt example for lesetid",
})
</script>

<template>
  <div class="h-dvh flex flex-col items-center justify-center gap-4">
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
