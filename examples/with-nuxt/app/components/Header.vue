<script setup lang="ts">
import {
  url,
} from "../../.lesetid/example.json";
</script>

<template>
  <header class="px-4">
    <nav class="flex flex-wrap items-center justify-between">
      <div class="flex items-center gap-2">
        <NuxtLink href="/" class="transition-transform active:scale-95">
          Nuxt Example
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4 sm:gap-6">
        <NuxtLink class="transition-transform active:scale-95" href="/">
          Posts
        </NuxtLink>
        <NuxtLink class="transition-transform active:scale-95" :href="`https://github.com/luxass/lesetid/blob/main${url}`">
          <Icon name="mdi:github" class="size-5" />
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
