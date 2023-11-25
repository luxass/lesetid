<script setup lang="ts">
import type { Example } from "~/types/example";

const {
  big = false,
  example,
}
  = defineProps<{
    big?: boolean
    example: Example
  }>();

const mode = useColorMode();

const {
  url: _url,
  title,
  iconUrl,
} = example;

const url = useCorrectUrl({
  path: _url.replace("https://lesetid.dev", ""),
});
</script>

<template>
  <NuxtLink
    :href="url"
    class="h-20 flex items-center gap-2 border border-base rounded text-center"
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
