import type { Example } from "~/types/example";

export async function useExamples() {
  return await useAsyncData<Example[]>(() => $fetch("/api/examples"));
};
