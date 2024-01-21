<script setup lang="ts">
import type { CustomParsedContent } from "~/types"

const { post } = defineProps<{
  post: CustomParsedContent
}>()

const {
  title,
  description,
  date,
} = post

const formattedDate = new Date(date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})
</script>

<template>
  <NuxtLink :href="`/posts${post._path}`" class="flex flex-col justify-between h-36 border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 rounded p-3 gap-3">
    <span class="text-lg font-semibold">{{ title }}</span>
    <div class="flex-grow">
      <span class="line-clamp-2">{{ description }}</span>
    </div>
    <span>{{ formattedDate }}</span>
  </NuxtLink>
</template>
