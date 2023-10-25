<script setup lang="ts">
const {
  title,
  url,
  iconUrl,
}
  = defineProps<{
    title: string
    iconUrl?: string
    url: string
  }>();
</script>

<template>
  <NuxtLink
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="border border-base rounded p-4 flex items-center gap-2"
  >
    <NuxtImg v-if="iconUrl" :src="iconUrl" width="32" height="32" />
    {{ title }}
  </NuxtLink>
</template>
