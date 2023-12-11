<script setup lang="ts">
import "./styles/global.css";

const ogUrl = process.env.NODE_ENV === "production"
  ? process.env.VERCEL_ENV === "production"
    ? "https://lesetid.dev"
    : `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

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
});
</script>

<template>
  <Header />
  <main class="flex-1 p-4">
    <NuxtPage />
  </main>
  <Footer />
</template>
