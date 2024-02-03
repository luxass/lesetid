<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode.forced">
    <button
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      class="ml1 flex items-center justify-center text-lg op-50 hover:op-75"
      @click="isDark = !isDark"
    >
      <Icon :name="isDark ? 'carbon:moon' : 'carbon:sun'" size="24" />
    </button>

    <template #fallback>
      <div class="size-6" />
    </template>
  </ClientOnly>
</template>
