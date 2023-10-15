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
  <div class="flex items-center text-center text-xl justify-center w-full h-full bg-blue-600">
    <h1 class="text-white">
      {{ props.title }}
    </h1>

    <p class="text-white text-lg">
      {{ props.description }}
    </p>
  </div>
</template>
