<script setup lang="ts">
import {
  url,
} from "../.lesetid/example.json";
</script>

<template>
  <footer class="mt-8 border-t border-t-neutral-700 pt-8 text-center flex items-center justify-between gap-2 px-4">
    <p>Nuxt Example</p>
    <ul>
      <li class="flex items-center gap-2">
        <NuxtLink to="/sitemap.xml" aria-label="sitemap">
          <Icon name="mdi:sitemap" class="size-5" />
        </NuxtLink>
        <NuxtLink :to="`https://github.com/luxass/lesetid/blob/main${url}`" aria-label="github">
          <Icon name="mdi:github" class="size-5" />
        </NuxtLink>
      </li>
    </ul>
  </footer>
</template>
