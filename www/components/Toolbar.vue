<script setup lang="ts">
import {
  estimate,
} from "lesetid";

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

const {
  data,
  error,
} = await useFetch("/api/texts");

const selectedText = ref("");

watch(selectedText, () => {
  text.value = data?.value?.texts.find((text) => text.key === selectedText.value)?.file || "";
});
</script>

<template>
  <div class="rounded border border-base p-2 flex flex-wrap justify-between gap-2">
    <div class="flex items-center gap-2">
      <Icon name="🕑" size="24" />
      <span>{{ time.text }}</span>
    </div>
    <Select v-if="data && !error" v-model="selectedText">
      <option disabled selected value="">
        Select an example...
      </option>
      <option v-for="text of data.texts" :key="text.key">
        {{ text.key }}
      </option>
    </Select>
  </div>
</template>
