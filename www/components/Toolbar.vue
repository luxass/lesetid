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

const { data, error } = await useFetch("/api/texts");

const selectedText = ref("");

watch(selectedText, () => {
  // @ts-expect-error - How will i fix this?
  text.value
    = data?.value?.texts.find((text) => text.key === selectedText.value)?.file
    || "";
});
</script>

<template>
  <div class="rounded border border-base p-2 flex flex-wrap justify-between gap-2">
    <div class="flex items-center gap-2">
      <Icon name="🕑" size="24" />
      <span>{{ time.text }}</span>
    </div>
    <div class="flex items-center gap-2">
      chars <span class="text-gray/70 dark:text-gray/50">·</span>
      {{ time.chars }}
      <span class="text-gray/70 dark:text-gray/50">|</span> words<span class="text-gray/70 dark:text-gray/50">·</span>{{
        time.words }}
    </div>
    <Select v-if="data && !error" v-model="selectedText">
      <option disabled selected value="">
        Select an example text...
      </option>
      <option v-for="{ key } of data.texts" :key="key">
        {{ key }}
      </option>
    </Select>
  </div>
</template>
