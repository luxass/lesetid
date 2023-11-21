<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center bg-blue-600 text-center text-xl"
  >
    <h1 class="text-white">
      {{ props.title }}
    </h1>

    <p class="text-lg text-white">
      {{ props.description }}
    </p>
  </div>
</template>
