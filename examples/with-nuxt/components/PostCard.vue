<script setup lang="ts">
import type { CustomParsedContent } from "~/types"

const props
= defineProps<{
  post: CustomParsedContent
}>()

const formattedDate = new Date(props.post.date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

const formattedTitle = props.post.title.length > 30 ? `${props.post.title.slice(0, 30)}...` : props.post.title
</script>

<template>
  <NuxtLink :href="post._path" class="h-full min-h-36 flex flex-col border border-transparent rounded p-4 text-neutral-800 hover:(border-neutral-700) dark:text-neutral-200">
    <h3 class="!my-0">
      {{ formattedTitle }}
    </h3>

    <p class="flex-1">
      {{ post.description }}
    </p>

    <span class="flex items-center gap-x-1">
      <Icon name="carbon:calendar" />

      {{ formattedDate }}
    </span>
    <span class="flex items-center gap-x-1">
      <Icon name="carbon:alarm" />
      {{ props.post.estimation.text || "No estimation" }}
    </span>
  </NuxtLink>
</template>
