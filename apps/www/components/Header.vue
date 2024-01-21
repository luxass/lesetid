<script setup lang="ts">
const { title } = withDefaults(defineProps<{
  title?: string
}>(), {
  title: "lesetid",
})
</script>

<template>
  <header>
    <nav class="flex flex-wrap items-center justify-between">
      <NuxtLink href="/" class="flex items-center gap-2">
        <slot name="icon">
          <Icon name="📖" size="32" class="cursor-pointer select-none" />
        </slot>

        <h1>{{ title }}</h1>
      </NuxtLink>

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
