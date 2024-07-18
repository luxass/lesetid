<script setup lang="ts">
const {
  data: examples,
} = await useFetch("/api/examples");

const issueUrl = "https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D";
</script>

<template>
  <Header />

  <main class="mt-8 flex flex-col gap-8">
    <h2 class="text-xl">
      Examples
      <span class="op25 text-sm">
        ({{ examples?.length || 0 }} examples)
      </span>
    </h2>
    <p>
      Pick the examples you want, or you can create an <NuxtLink
        :href="issueUrl" target="_blank"
        rel="noopener noreferrer" class="underline-offset-3 underline"
      >
        issue.
      </NuxtLink>
    </p>
    <div class="mt-4 grid grid-cols-1 gap-4 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="example in examples" :key="example.handle" :href="example.url"
        class="border-base flex h-20 flex-row items-center gap-2 rounded border p-4 text-center"
      >
        <img
          v-if="example.iconUrl" :src="example.iconUrl" width="32"
          height="32" :alt="`Icon for ${example.title}`"
        >
        <Icon v-else name="ph:question" size="32" />
        <span class="flex-1 text-left">{{ example.title }}</span>
      </NuxtLink>
      <NuxtLink
        href="https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D"
        target="_blank" rel="noopener noreferrer"
        class="border-base flex h-20 items-center gap-2 rounded border border-dashed p-4 text-center hover:border-solid"
      >
        <Icon name="octicon:package-24" size="32" />
        <span class="flex-1 text-left">Missing an example?</span>
      </NuxtLink>
    </div>
  </main>
</template>
