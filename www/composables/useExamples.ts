import type { Example } from "~/types/example";

export async function useExamples() {
  const url = useCorrectUrl({
    path: "/api/examples",
  });

  return await useAsyncData<Example[]>(() => $fetch(url));
};
