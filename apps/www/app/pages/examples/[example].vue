<script lang="ts" setup>
const route = useRoute();

const { example: exampleParam } = route.params;
if (!exampleParam) {
  await navigateTo("/examples");
}

const {
  data: example,
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
  <Header :title="example?.title">
    <template #icon>
      <img
        v-if="example?.iconUrl " :src="example?.iconUrl" width="32"
        height="32"
        alt="Icon for {{ example?.title }}"
      >
      <Icon v-else name="octicon:question" size="32" />
    </template>
  </Header>

  <NuxtLink href="/examples" class="underline-offset-3 mt-4 block text-right underline">
    Back to examples
  </NuxtLink>

  <main class="mt-4 flex flex-col gap-8">
    <div class="mt-4 grid grid-cols-1 gap-4 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="[provider, providerUrl] in providers" :key="provider" :href="providerUrl"
        class="border-base flex h-20 flex-row items-center gap-2 rounded border p-4 text-center"
      >
        <Icon
          :name="PROVIDER_ICONS[provider] || 'octicon:question'" size="32"
        />
        <span class="flex-1 text-left capitalize">{{ provider }}</span>
      </NuxtLink>
    </div>
  </main>
</template>
