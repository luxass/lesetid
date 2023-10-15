<script setup lang="ts">
import {
  estimate,
} from "lesetid";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const text = ref("");

watch(text, () => {
  console.log("LESETID", estimate(text.value));
});
</script>

<template>
  <nav flex items-center justify-between flex-wrap>
    <div class="flex gap-2 items-center">
      <Icon name="📖" size="32" />
      <h1>lesetid</h1>
    </div>

    <div flex items-center justify-between gap-2>
      <NuxtLink href="https://github.com/luxass/lesetid">
        <Icon name="octicon:mark-github" size="24" />
      </NuxtLink>

      <button title="Toggle Dark Mode" ml1 text-lg op="50 hover:75" @click="toggleDark()">
        <ClientOnly>
          <Icon :name="isDark ? 'carbon:sun' : 'carbon:moon'" size="24" />

          <template #fallback>
            <Icon name="iconoir:question-mark" size="24" />
          </template>
        </ClientOnly>
      </button>
    </div>
  </nav>

  <main class="mt-8 flex flex-col">
    <Toolbar />
  </main>
</template>
