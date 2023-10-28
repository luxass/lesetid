<script setup lang="ts">
const {
  title,
  url,
  iconUrl,
}
  = defineProps<{
    title: string
    iconUrl?: string | {
      dark: string
      light: string
    }
    url: string
  }>();
const isDark = useDark();
</script>

<template>
  <NuxtLink
    :href="url" target="_blank" rel="noopener noreferrer"
    class="border border-base rounded p-4 flex items-center gap-2"
  >
    <NuxtImg v-if="(iconUrl && typeof iconUrl === 'object') && isDark" width="32" height="32" src="/astro-dark.svg" />
    <NuxtImg v-if="(iconUrl && typeof iconUrl === 'object') && !isDark" width="32" height="32" src="/astro-light.svg" />
    <NuxtImg v-if="iconUrl && typeof iconUrl === 'string'" :src="iconUrl" width="32" height="32" />
    {{ title }}
  </NuxtLink>
</template>
