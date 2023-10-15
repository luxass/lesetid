<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
const text = ref("");
</script>

<template>
  <nav flex items-center justify-between flex-wrap>
    <div class="flex gap-2 items-center">
      <Icon name="octicon:mark-github" size="32" />
      <h1>lesetid</h1>
    </div>

    <button title="Toggle Dark Mode" ml1 text-lg op50 hover:op75 @click="toggleDark()">
      <!-- Fix this, currently there are an issue with first render on darkmode. -->
      <Icon :name="isDark ? 'carbon:sun' : 'carbon:moon'" size="24" />
    </button>
  </nav>

  <main class="mt-8 flex flex-col">
    <Toolbar />
  </main>
</template>
