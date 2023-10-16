<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
const text = ref("");
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
      <!-- <NuxtLink href="https://npmjs.com/package/lesetid">
        <Icon name="carbon:logo-npm" size="24" />
      </NuxtLink> -->

      <button title="Toggle Dark Mode" class="ml1 text-lg op-50 hover:op-75 flex items-center justify-center" @click="toggleDark()">
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
    <Toolbar :model-value="text" @update:model-value="(str) => text = str" />
    <textarea v-model="text" class="border border-base rounded bg-base shadow-sm h-2xl w-full of-auto p-4 text-sm outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 resize-none" />
  </main>
</template>
