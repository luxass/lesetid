import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind4({
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
