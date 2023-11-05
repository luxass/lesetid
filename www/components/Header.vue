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
</script>

<template>
  <header>
    <nav class="flex items-center justify-between flex-wrap">
      <div class="flex gap-2 items-center">
        <Icon :name="state" size="32" class="select-none cursor-pointer" @click="next()" />
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
            <button title="Toggle Dark Mode" class="ml1 text-lg op-50 hover:op-75 flex items-center justify-center" @click="toggle">
              <Icon :name="isDark ? 'carbon:moon' : 'carbon:sun'" size="24" />
            </button>
          </ColorScheme>

          <template #fallback>
            <button title="Toggle Dark Mode" class="ml1 text-lg op-50 hover:op-75 flex items-center justify-center">
              <Icon name="carbon:moon" size="24" />
            </button>
          </template>
        </ClientOnly>
      </div>
    </nav>
  </header>
</template>
