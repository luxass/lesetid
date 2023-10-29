<script setup lang="ts">
const text = ref("Write your article here!");

interface Example {
  key: string
  iconUrl: string | {
    dark: string
    light: string
  }
  title: string
  url: string
}

const {
  data,
  error,
} = await useFetch<{ examples: Example[] }>("https://examples.lesetid.dev");
</script>

<template>
  <Header />

  <main class="mt-8 flex flex-col gap-8">
    <Toolbar :model-value="text" @update:model-value="(str) => (text = str)" />
    <textarea
      v-model="text"
      class="border border-base rounded bg-base shadow-sm h-2xl w-full of-auto p-4 text-sm outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 resize-none"
    />

    <section v-if="!error || data?.examples" id="examples" class="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-3 sm:gap-3">
      <ExampleCard
        v-for="example in data?.examples" :key="example.url" :icon-url="example.iconUrl" :title="example.title"
        :url="example.url"
      />
      <NuxtLink
        href="https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D"
        target="_blank" rel="noopener noreferrer"
        class="text-center border border-base border-dashed hover:border-solid rounded p-4 flex items-center gap-2"
      >
        <Icon name="material-symbols:crop-square-outline" size="24" />
        Missing an example?
      </NuxtLink>
    </section>
  </main>
</template>
