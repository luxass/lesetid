<script setup lang="ts">
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

const issueUrl = "https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D";
</script>

<template>
  <Header />

  <main class="mt-8 flex flex-col gap-8">
    <h2>
      Examples
      <span class="text-sm op25">
        {{ data?.examples?.length }} examples
      </span>
    </h2>
    <p>
      Pick the examples you want, or you can create an <NuxtLink
        :href="issueUrl" target="_blank"
        rel="noopener noreferrer" class="underline underline-offset-3 underline-dashed"
      >
        issue.
      </NuxtLink>
    </p>
    <section v-if="!error || data?.examples" id="examples" class="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-3 sm:gap-3">
      <ExampleCard
        v-for="example in data?.examples" :key="example.url" :big="true" :icon-url="example.iconUrl"
        :title="example.title" :url="example.url"
      />
      <NuxtLink
        :href="issueUrl" target="_blank" rel="noopener noreferrer"
        class="flex flex-col items-center justify-center gap-2 border border-base rounded border-dashed p-8 text-center hover:border-solid"
      >
        <Icon name="material-symbols:crop-square-outline" size="24" />
        Missing an example?
      </NuxtLink>
    </section>
  </main>
</template>
