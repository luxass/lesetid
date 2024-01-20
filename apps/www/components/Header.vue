<script setup lang="ts">
const { state, next } = useCycleList([
  "📋",
  "📖",
  "📚",
  "🇩🇰",
]);
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
          <Icon name="octicon:mark-github" size="24" title="GitHub" />
        </NuxtLink>
        <NuxtLink href="https://npmjs.com/package/lesetid">
          <Icon name="carbon:logo-npm" size="24" title="NPM" />
        </NuxtLink>

        <ColorMode />
      </div>
    </nav>
  </header>
</template>
