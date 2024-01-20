<script setup lang="ts">
import type { CustomParsedContent } from "~/types"
</script>

<template>
  <ContentDoc v-slot="{ doc }">
    <article class="tracking-wide prose">
      <Notification v-if="!(doc as CustomParsedContent).published" type="important">
        This post is a <strong>draft</strong>. It may be incomplete or contain
        inaccuracies.
      </Notification>

      <Notification type="note">
        This post will approximately take <strong>{{ (doc as CustomParsedContent).estimation.text }}</strong> to read.
      </Notification>
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>
