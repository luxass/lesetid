<script setup lang="ts">
import "./styles/global.css";

useHead({
  title: "lesetid | nuxt example",
  meta: [
    {
      name: "description",
      content: "A example nuxt app using lesetid.dev",
    },
    {
      // disable darkreader
      name: "darkreader-lock",
      content: "",
    },
  ],
});

useSeoMeta({
  description: "A example nuxt app using lesetid.dev",
  ogTitle: "lesetid | nuxt example",
  ogDescription: "A example nuxt app using lesetid.dev",
});

defineOgImage({
  title: "lesetid | nuxt example",
  description: "A example nuxt app using lesetid.dev",
  component: "Base",
});
</script>

<template>
  <Header />
  <main class="prose flex-1 p-4">
    <NuxtPage />
  </main>
  <Footer />
</template>
