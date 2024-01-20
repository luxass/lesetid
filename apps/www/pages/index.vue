<script setup lang="ts">
const text = ref("Write your article here!");
const debounced = useDebounce(text, 500);
const {
  data: examples,
  error,
} = await useExamples();

const mode = useColorMode();
</script>

<template>
  <Header />
  <main class="mt-8 flex flex-col gap-8">
    <Toolbar v-model="debounced" />
    <textarea
      v-model="text" aria-label="Write your article here!"
      class="h-[42rem] w-full resize-none overflow-auto border border-base rounded p-4 text-sm shadow-sm outline-none focus-within:border-blue-600 bg-base focus-within:ring-2 focus-within:ring-blue-600"
    />

    <section v-if="!error || examples" id="examples" class="mt-8">
      <h2 class="text-xl">
        Examples
      </h2>
      <p>
        If you want to open a provider different from <NuxtLink
          href="https://stackblitz.com" target="_blank"
          class="underline underline-offset-3" rel="noopener noreferrer"
        >
          Stackblitz
        </NuxtLink> you can use the <NuxtLink href="/examples" class="underline underline-offset-3">
          examples page
        </NuxtLink>
      </p>
      <div class="grid grid-cols-2 mt-4 gap-4 lg:grid-cols-3 sm:gap-3">
        <NuxtLink
          v-for="example in examples" :key="example.handle" :href="example.providers.stackblitz || example.url"
          class="h-20 flex flex-row items-center gap-2 border border-base rounded p-4 text-center"
        >
          <ClientOnly>
            <img
              v-if="(example.iconUrl && typeof example.iconUrl === 'object') && mode.value === 'dark'" width="32"
              height="32" :src="example.iconUrl.dark" :alt="`Icon for ${example.title}`"
            >
            <img
              v-if="(example.iconUrl && typeof example.iconUrl === 'object') && mode.value !== 'dark'" width="32"
              height="32" :src="example.iconUrl.light" :alt="`Icon for ${example.title}`"
            >
            <img
              v-if="example.iconUrl && typeof example.iconUrl === 'string'" :src="example.iconUrl" width="32"
              height="32" :alt="`Icon for ${example.title}`"
            >

            <template #fallback>
              <Icon name="ph:question" size="32" />
            </template>
          </ClientOnly>
          <span class="flex-1 text-left">{{ example.title }}</span>
        </NuxtLink>
        <NuxtLink
          href="https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D"
          target="_blank" rel="noopener noreferrer"
          class="h-20 flex items-center gap-2 border border-base rounded border-dashed p-4 text-center hover:border-solid"
        >
          <Icon name="octicon:package-24" size="32" />
          <span class="flex-1 text-left">Missing an example?</span>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
