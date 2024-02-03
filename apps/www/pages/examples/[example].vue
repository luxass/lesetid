<script lang="ts" setup>
const route = useRoute();
const mode = useColorMode();

const { example: exampleParam } = route.params;
if (!exampleParam) {
  await navigateTo("/examples");
}

const {
  data: example,
  pending,
  error,
} = await useAsyncData(`example-${exampleParam}`, () => $fetch(`/api/examples/${route.params.example}`));

if (!example || !example?.value) {
  await navigateTo("/examples");
}

const providers = computed(() => {
  return Object.entries(example?.value?.providers || {});
});

const PROVIDER_ICONS: Record<string, string> = {
  stackblitz: "logos:stackblitz-icon",
  codesandbox: "logos:codesandbox-icon",
  codespaces: "octicon:mark-github-16",
  gitpod: "devicon:gitpod",
};
</script>

<template>
  <span v-if="pending || error">HAHAHA</span>
  <Header v-else :title="example?.title">
    <template #icon>
      <ClientOnly>
        <img
          v-if="(example?.iconUrl && typeof example?.iconUrl === 'object') && mode.value === 'dark'" width="32"
          height="32" :src="example?.iconUrl.dark"
          alt="Icon for {{ example?.title }}"
        >
        <img
          v-if="(example?.iconUrl && typeof example?.iconUrl === 'object') && mode.value !== 'dark'" width="32"
          height="32" :src="example?.iconUrl.light"
          alt="Icon for {{ example?.title }}"
        >
        <img
          v-if="example?.iconUrl && typeof example?.iconUrl === 'string'" :src="example?.iconUrl" width="32"
          height="32"
          alt="Icon for {{ example?.title }}"
        >

        <template #fallback>
          <Icon name="octicon:question" size="32" />
        </template>
      </ClientOnly>
    </template>
  </Header>

  <NuxtLink href="/examples" class="text-right underline underline-offset-3 mt-4 block">
    Back to examples
  </NuxtLink>

  <main class="mt-4 flex flex-col gap-8">
    <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 lg:grid-cols-3 sm:gap-3">
      <NuxtLink
        v-for="[provider, providerUrl] in providers" :key="provider" :href="providerUrl"
        class="h-20 flex flex-row items-center gap-2 border border-base rounded p-4 text-center"
      >
        <Icon
          :name="PROVIDER_ICONS[provider] || 'octicon:question'" size="32" :class="{
            'dark:fill-white': provider === 'codesandbox',
          }"
        />
        <span class="flex-1 text-left capitalize">{{ provider }}</span>
      </NuxtLink>
    </div>
  </main>
</template>
