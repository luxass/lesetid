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
  <NuxtLink
    :href="`/posts${post._path}`"
    class="group flex max-w-sm cursor-pointer flex-col gap-2 rounded-md border border-neutral-300 dark:border-neutral-700 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-neutral-400"
  >
    <div class="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
      <p>{{ title }}</p>
      <div class="flex flex-row items-center gap-4">
        <p>{{ formattedDate }}</p>

        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="transition-all duration-300 group-hover:translate-x-1">
          <path d="M5.25 12.75L12.75 5.25" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M5.25 5.25H12.75V12.75" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <p class="truncate">
      {{ description }}
    </p>
  </NuxtLink>
</template>
