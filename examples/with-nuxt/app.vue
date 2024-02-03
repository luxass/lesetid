<script setup lang="ts">
const ogUrl = process.env.NODE_ENV === "production"
  ? process.env.CONTEXT === "production"
    ? "https://nuxt-example.lesetid.dev"
    : process.env.DEPLOY_URL
  : "http://localhost:3001"

useSeoMeta({
  description: "A example nuxt app using lesetid",
  ogTitle: "nuxt example | nuxt-example.lesetid.dev",
  ogDescription: "A example nuxt app using lesetid",
  ogUrl,
  ogImageAlt: "lesetid nuxt example",
  twitterTitle: "nuxt example | nuxt-example.lesetid.dev",
  twitterDescription: "A example nuxt app using lesetid",
  twitterCard: "summary",
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
