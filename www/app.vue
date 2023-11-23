<script setup lang="ts">
import "floating-vue/dist/style.css";
import "./styles/global.css";

useHead({
  title: "lesetid | playground",
});

const ogUrl = process.env.NODE_ENV === "production"
  ? process.env.VERCEL_ENV === "production"
    ? "https://lesetid.dev"
    : `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

useSeoMeta({
  description: "A playground for lesetid",
  ogTitle: "lesetid | playground",
  ogDescription: "A playground for lesetid",
  ogImage: `${ogUrl}/og-image.png`,
  ogUrl,
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "lesetid playground",
  twitterTitle: "lesetid | playground",
  twitterDescription: "A playground for lesetid",
  twitterImage: `${ogUrl}/og-image.png`,
  twitterCard: "summary",
});
</script>

<template>
  <div class="py3 md:px14 md:py10">
    <NuxtPage />
  </div>
</template>
