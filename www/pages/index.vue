<script setup lang="ts">
const mode = useColorMode();
const isDark = computed<boolean>({
  get() {
    return mode.value === "dark";
  },
  set() {
    mode.preference = isDark.value ? "light" : "dark";
  },
});

function toggle() {
  isDark.value = !isDark.value;
}

const { state, next } = useCycleList([
  "📋",
  "📖",
  "📚",
  "🇩🇰",
]);

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
} = await useAsyncData<{ examples: Example[] }>(() => $fetch("https://examples.lesetid.dev"));
</script>

<template>
  <header>
    <nav class="flex flex-wrap items-center justify-between">
      <div class="flex items-center gap-2">
        <Icon :name="state" size="32" class="cursor-pointer select-none" @click="next()" />
        <NuxtLink href="/">
          <h1>lesetid</h1>
        </NuxtLink>
      </div>

      <div class="flex items-center justify-between gap-2">
        <NuxtLink href="https://github.com/luxass/lesetid">
          <Icon name="octicon:mark-github" size="24" />
        </NuxtLink>
        <NuxtLink href="https://npmjs.com/package/lesetid">
          <Icon name="carbon:logo-npm" size="24" />
        </NuxtLink>

        <ClientOnly>
          <ColorScheme tag="span">
            <button
              title="Toggle Dark Mode" class="ml1 flex items-center justify-center text-lg op-50 hover:op-75"
              @click="toggle"
            >
              <Icon :name="isDark ? 'carbon:moon' : 'carbon:sun'" size="24" />
            </button>
          </ColorScheme>

          <template #fallback>
            <button title="Toggle Dark Mode" class="ml1 flex items-center justify-center text-lg op-50 hover:op-75">
              <Icon name="carbon:moon" size="24" />
            </button>
          </template>
        </ClientOnly>
      </div>
    </nav>
  </header>

  <main class="mt-8 flex flex-col gap-8">
    <Toolbar :model-value="text" @update:model-value="(str) => (text = str)" />
    <textarea
      v-model="text"
      class="h-2xl w-full resize-none of-auto border border-base rounded p-4 text-sm shadow-sm outline-none focus-within:border-blue-600 bg-base focus-within:ring-2 focus-within:ring-blue-600"
    />

    <section v-if="!error || data?.examples" id="examples" class="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-3 sm:gap-3">
      <ExampleCard
        v-for="example in data?.examples" :key="example.url" :icon-url="example.iconUrl" :title="example.title"
        :url="example.url"
      />
      <NuxtLink
        href="https://github.com/luxass/lesetid/issues/new?assignees=&labels=example&projects=&template=missing-example.yml&title=missing+example+for+%5BEXAMPLE%5D"
        target="_blank" rel="noopener noreferrer"
        class="h-20 flex items-center gap-2 border border-base rounded border-dashed p-4 text-center hover:border-solid"
      >
        <Icon name="material-symbols:crop-square-outline" size="32" />
        <span class="flex-1 text-left">Missing an example?</span>
      </NuxtLink>
    </section>
  </main>
</template>
