<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    placeholder?: string;
    icon?: string;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    placeholder: "",
    disabled: false,
    icon: "",
  },
);
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();
const input = useVModel(props, "modelValue", emit, { passive: true });
</script>

<template>
  <div
    class="bg-base flex items-center rounded border px-2 py-1 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600"
    :class="disabled ? 'border-gray:10' : 'border-base'"
  >
    <slot name="icon">
      <Icon v-if="icon" :name="icon" class="mr-0.4em text-1.1em op50" />
    </slot>
    <select
      v-model="input" aria-label="Select a article to look at." :disabled="disabled"
      class="bg-base w-full flex-auto appearance-none !outline-none" :class="disabled ? 'appearance-none' : ''"
    >
      <option v-if="placeholder" value="" disabled hidden>
        {{ placeholder }}
      </option>
      <slot />
    </select>
  </div>
</template>
