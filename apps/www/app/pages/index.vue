<script setup lang="ts">
const text = ref("Write your article here!");
const debounced = useDebounce(text, 500);
</script>

<template>
  <Header />
  <main class="mt-8 flex flex-col gap-8">
    <Toolbar v-model="debounced" />
    <textarea
      v-model="debounced" aria-label="Write your article here!"
      class="border-base bg-base h-[42rem] w-full resize-none overflow-auto rounded border p-4 text-sm shadow-sm outline-none focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600"
    />

    <Examples />
  </main>
</template>
