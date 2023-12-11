<script setup lang="ts">
import { estimate } from "lesetid";

const props = withDefaults(
  defineProps<{
    modelValue?: string
  }>(),
  {
    modelValue: undefined,
  },
);
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

const text = useVModel(props, "modelValue", emit, { passive: true });

const time = computed(() => {
  return estimate(text.value);
});

const { data, error } = await useAsyncData(() => $fetch("/api/texts"));

const selectedText = ref("");

watch(selectedText, () => {
  text.value
    = data?.value?.texts.find((text) => text.key === selectedText.value)?.file
    || "";
});
</script>

<template>
  <div class="flex flex-wrap justify-between gap-2 border border-base rounded p-2">
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
