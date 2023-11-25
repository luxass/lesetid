<script lang="ts" setup>
import type { Example } from "~/types/example";

const route = useRoute();
const mode = useColorMode();

const {
  data,
  error,
} = await useAsyncData<Example>(() => $fetch(`/api/examples/${route.params.example}`));

if (!data || error.value) {
  await navigateTo("/examples");
}

const example = (data as Ref<Example>);

const providers = computed(() => {
  return Object.entries(example.value.providers);
});

const PROVIDER_ICONS: Record<string, string> = {
  stackblitz: "logos:stackblitz-icon",
  codesandbox: "logos:codesandbox-icon",
  codespaces: "octicon:mark-github-16",
};
</script>

<template>
  <header>
    <nav class="flex flex-wrap items-center justify-between">
      <div class="flex items-center gap-2">
        <ClientOnly>
          <ColorScheme tag="span">
            <NuxtImg
              v-if="(example.iconUrl && typeof example.iconUrl === 'object') && mode.value === 'dark'" width="32"
              height="32" :src="example.iconUrl.dark"
            />
            <NuxtImg
              v-if="(example.iconUrl && typeof example.iconUrl === 'object') && mode.value !== 'dark'" width="32"
              height="32" :src="example.iconUrl.light"
            />
            <NuxtImg
              v-if="example.iconUrl && typeof example.iconUrl === 'string'" :src="example.iconUrl" width="32"
              height="32"
            />
          </ColorScheme>

          <template #fallback>
            <Icon name="octicon:question" size="32" />
          </template>
        </ClientOnly>
        <h1>{{ example.title }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink href="/examples" class="underline underline-offset-3">
          Back to examples
        </NuxtLink>
      </div>
    </nav>
  </header>
  <main class="mt-8 flex flex-col gap-8">
    <div class="grid grid-cols-2 mt-4 gap-4 lg:grid-cols-3 sm:gap-3">
      <NuxtLink
        v-for="[provider, providerUrl] in providers" :key="provider" :href="providerUrl"
        class="h-20 flex flex-row items-center gap-2 border border-base rounded p4 text-center"
      >
        <Icon
          :name="PROVIDER_ICONS[provider] || 'octicon:question'" size="32" :class="{
            'fill-white': provider === 'codesandbox',
          }"
        />
        <span class="flex-1 text-left capitalize">{{ provider }}</span>
      </NuxtLink>
    </div>
  </main>
</template>
