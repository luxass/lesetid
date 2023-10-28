<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
const text = ref("Write your article here!");

interface Example {
  iconUrl: string | {
    dark: string
    light: string
  }
  title: string
  url: string
}

const examples: Example[] = [
  {
    iconUrl: {
      dark: "/astro-dark.svg",
      light: "/astro-light.svg",
    },
    title: "Astro Example",
    url: "https://astro-example.lesetid.dev",
  },
  {
    iconUrl: "/vite.svg",
    title: "Vite Example",
    url: "https://vite-example.lesetid.dev",
  },
  {
    iconUrl: "/nextjs.svg",
    title: "NextJS Example",
    url: "https://next-example.lesetid.dev",
  },
  {
    iconUrl: "/nuxt.svg",
    title: "Nuxt Example",
    url: "https://nuxt-example.lesetid.dev",
  },
  {
    iconUrl: "/svelte.svg",
    title: "SvelteKit Example",
    url: "https://sveltekit-example.lesetid.dev",
  },
];
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap">
    <div class="flex gap-2 items-center">
      <Icon name="📖" size="32" />
      <h1>lesetid</h1>
    </div>

    <div class="flex items-center justify-between gap-2">
      <NuxtLink href="https://github.com/luxass/lesetid">
        <Icon name="octicon:mark-github" size="24" />
      </NuxtLink>
      <NuxtLink href="https://npmjs.com/package/lesetid">
        <Icon name="carbon:logo-npm" size="24" />
      </NuxtLink>

      <button
        title="Toggle Dark Mode" class="ml1 text-lg op-50 hover:op-75 flex items-center justify-center"
        @click="toggleDark()"
      >
        <ClientOnly>
          <Icon :name="isDark ? 'carbon:sun' : 'carbon:moon'" size="24" />

          <template #fallback>
            <Icon name="iconoir:question-mark" size="24" />
          </template>
        </ClientOnly>
      </button>
    </div>
  </nav>

  <main class="mt-8 flex flex-col gap-8">
    <Toolbar :model-value="text" @update:model-value="(str) => (text = str)" />
    <textarea
      v-model="text"
      class="border border-base rounded bg-base shadow-sm h-2xl w-full of-auto p-4 text-sm outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 resize-none"
    />

    <section id="examples" class="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-3 sm:gap-3">
      <ExampleCard
        v-for="example in examples" :key="example.url" :icon-url="example.iconUrl" :title="example.title"
        :url="example.url"
      />
      <NuxtLink
        href="https://github.com/luxass/lesetid/issues/new?title=missing%20example%20for%20[EXAMPLE]&labels=example&body=aaa"
        target="_blank" rel="noopener noreferrer"
        class="border border-base border-dashed rounded p-4 flex items-center gap-2"
      >
        <Icon name="material-symbols:crop-square-outline" size="24" />
        Missing an example?
      </NuxtLink>
    </section>
  </main>
</template>
