<script setup lang="ts">
import "floating-vue/dist/style.css";
import "./styles/global.css";

useHead({
  title: "lesetid | playground",
  link: [
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📖</text></svg>",
    },
  ],
});

useSeoMeta({
  description: "A playground for lesetid",
  ogTitle: "lesetid | playground",
  ogDescription: "A playground for lesetid",
});

defineOgImage({
  title: "lesetid | playground",
  description: "A playground for lesetid, a tool to estimate reading time.",
  component: "Base",
});
</script>

<template>
  <div class="md:px14 py3 md:py10">
    <NuxtPage />
  </div>
</template>
