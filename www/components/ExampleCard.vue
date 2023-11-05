<script setup lang="ts">
const {
  big = false,
  title,
  url,
  iconUrl,
}
  = defineProps<{
    big?: boolean
    title: string
    iconUrl?: string | {
      dark: string
      light: string
    }
    url: string
  }>();

const mode = useColorMode();
</script>

<template>
  <NuxtLink
    :href="url" target="_blank" rel="noopener noreferrer"
    class="border border-base rounded h-20 flex gap-2 items-center text-center"
    :class="{
      'flex-col p-8 justify-center': big,
      'flex-row p-4': !big,
    }"
  >
    <ClientOnly>
      <ColorScheme tag="span">
        <NuxtImg v-if="(iconUrl && typeof iconUrl === 'object') && mode.value === 'dark'" width="32" height="32" :src="iconUrl.dark" />
        <NuxtImg v-if="(iconUrl && typeof iconUrl === 'object') && mode.value !== 'dark'" width="32" height="32" :src="iconUrl.light" />
        <NuxtImg v-if="iconUrl && typeof iconUrl === 'string'" :src="iconUrl" width="32" height="32" />
      </ColorScheme>

      <template #fallback>
        <Icon name="octicon:question" size="32" />
      </template>
    </ClientOnly>
    <span class="flex-1 text-left">{{ title }}</span>
  </NuxtLink>
</template>
