<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: any
    placeholder?: string
    icon?: string
    disabled?: boolean
  }>(),
  {
    modelValue: undefined,
    placeholder: "",
    disabled: false,
    icon: "",
  },
);
const emit = defineEmits<{ (...args: any): void }>();
const input = useVModel(props, "modelValue", emit, { passive: true });

// watch(text, () => {
//   console.log("LESETID", estimate(text.value));
// });

const {
  data,
  error,
} = await useFetch("/api/texts");

const selectedText = ref(data?.value?.texts[0]?.key || "");
</script>

<template>
  <Select v-if="data && !error" v-model="selectedText">
    <option v-for="text of data.texts" :key="text.key">
      {{ text.key }}
    </option>
  </Select>
</template>
