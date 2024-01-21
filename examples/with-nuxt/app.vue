<script setup lang="ts">
const ogUrl = process.env.NODE_ENV === "production"
  ? process.env.VERCEL_ENV === "production"
    ? "https://lesetid.dev"
    : `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

useSeoMeta({
  description: "A example nuxt app using lesetid",
  ogTitle: "lesetid | nuxt example",
  ogDescription: "A example nuxt app using lesetid",
  ogImage: `${ogUrl}/og-image.png`,
  ogUrl,
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "lesetid nuxt example",
  twitterTitle: "lesetid | nuxt example",
  twitterDescription: "A example nuxt app using lesetid",
  twitterImage: `${ogUrl}/og-image.png`,
  twitterCard: "summary",
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
