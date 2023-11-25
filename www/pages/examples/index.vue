<script setup lang="ts">
const {
  data: examples,
} = await useExamples();

const issueUrl = "https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D";
const mode = useColorMode();
</script>

<template>
  <Header />

  <main class="mt-8 flex flex-col gap-8">
    <h2 class="text-xl">
      Examples
      <span class="text-sm op25">
        ({{ examples?.length || 0 }} examples)
      </span>
    </h2>
    <p>
      Pick the examples you want, or you can create an <NuxtLink
        :href="issueUrl" target="_blank"
        rel="noopener noreferrer" class="underline underline-offset-3"
      >
        issue.
      </NuxtLink>
    </p>
    <div class="grid grid-cols-2 mt-4 gap-4 lg:grid-cols-3 sm:gap-3">
      <NuxtLink
        v-for="example in examples" :key="example.handle" :href="example.url"
        class="h-20 flex flex-row items-center gap-2 border border-base rounded p4 text-center"
      >
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
        <span class="flex-1 text-left">{{ example.title }}</span>
      </NuxtLink>
      <NuxtLink
        href="https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D"
        target="_blank" rel="noopener noreferrer"
        class="h-20 flex items-center gap-2 border border-base rounded border-dashed p-4 text-center hover:border-solid"
      >
        <Icon name="material-symbols:crop-square-outline" size="32" />
        <span class="flex-1 text-left">Missing an example?</span>
      </NuxtLink>
    </div>
  </main>
</template>
