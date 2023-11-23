export interface Example {
  key: string
  iconUrl: string | {
    dark: string
    light: string
  }
  title: string
  url: string
}

export async function useExamples() {
  return useAsyncData<{ examples: Example[] }>(() => $fetch("https://examples.lesetid.dev/json"));
};
