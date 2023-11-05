<script setup lang="ts">
import type { ParsedContent as DefaultParsedContent } from "@nuxt/content/dist/runtime/types";

const props
  = defineProps<{
    // TODO: FIX THIS PLEASE...................................
    post: DefaultParsedContent
  }>();

const formattedDate = new Date(props.post).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// const formattedDate = new Date(date).toLocaleDateString("en-US", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// });

// const formattedTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;
</script>

<template>
  <NuxtLink :href="{ }" class="flex flex-col">
    <h3 class="!my-0">
      {formattedTitle}
    </h3>

    <p class="flex-1">
      {description}
    </p>

    <span class="flex items-center gap-x-1">
      <CalendarIcon />
      {formattedDate}
    </span>
    <span class="flex items-center gap-x-1">
      <AlarmIcon />
      {remarkPluginFrontmatter?.estimation?.text || "No estimation"}
    </span>
  </NuxtLink>
</template>
