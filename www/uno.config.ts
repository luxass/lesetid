import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media",
    }),
    presetIcons(),
  ],
  theme: {
    colors: {
      "background": "var(--background)",
      "foreground": "var(--foreground)",
      "accent": "#4169E1",
      "card-bg": "var(--card-bg)",
      "card-border": "var(--card-border)",
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
