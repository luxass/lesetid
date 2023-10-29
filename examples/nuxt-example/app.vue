<script setup lang="ts">
// import "floating-vue/dist/style.css";
import "./styles/global.css";

useHead({
  title: "lesetid | playground",
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
