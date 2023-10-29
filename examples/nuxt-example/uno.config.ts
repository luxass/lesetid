import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: {
    "bg-base": "bg-white dark:bg-[#151515]",
    "bg-secondary": "bg-gray:5",
    "bg-active": "bg-gray:10",
    "border-base": "border-gray/20",
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Lexend",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
