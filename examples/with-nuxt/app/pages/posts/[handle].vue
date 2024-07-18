<script setup lang="ts">
import type { ContentWithEstimation } from "../../../types";
</script>

<template>
  <ContentDoc v-slot="{ doc }">
    <article class="markdown prose tracking-wide">
      <div class="gap-3 rounded border border-neutral-300 p-3">
        This post will approximately take <strong>{{ (doc as ContentWithEstimation).estimation?.text || "NaN" }}</strong>
        to read.
      </div>

      <h1 class="mt-8">
        {{ doc.title }}
      </h1>
      <ContentRenderer :value="doc">
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </article>
  </ContentDoc>
</template>
