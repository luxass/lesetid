<script setup lang="ts">
import { estimate } from "lesetid";

const modelValue = defineModel<string>();

const time = computed(() => {
  return estimate(modelValue.value);
});

const { data, error } = await useAsyncData(() => $fetch("/api/texts"));

const selectedText = ref("");

watch(selectedText, (newVal) => {
  if (newVal) {
    modelValue.value
      = data?.value?.texts.find((text) => text.key === newVal)?.file
      || "";
  }
});
</script>

<template>
  <div class="border-base flex flex-wrap justify-between gap-2 rounded border p-2">
    <div class="flex items-center gap-2">
      <Icon name="🕑" size="24" />
      <span>{{ time.text }}</span>
    </div>
    <Select v-if="data && !error" v-model="selectedText" aria-label="Select a article to look at.">
      <option disabled selected value="">
        Select an example text...
      </option>
      <option v-for="{ key } of data.texts" :key="key">
        {{ key }}
      </option>
    </Select>
  </div>
</template>
