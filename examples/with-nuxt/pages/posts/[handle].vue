<script setup lang="ts">
import type { ContentWithEstimation } from "~/types"

const route = useRoute()

const handle = Array.isArray(route.params.handle)
  ? route.params.handle[0]
  : route.params.handle
</script>

<template>
  <ContentDoc v-slot="{ doc }" :path="handle">
    <article class="tracking-wide prose markdown">
      <div class="border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 rounded p-3 gap-3">
        This post will approximately take <strong>{{ (doc as ContentWithEstimation).estimation?.text || "NaN" }}</strong> to read.
      </div>

      <h1 class="mt-8">
        {{ doc.title }}
      </h1>
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>
