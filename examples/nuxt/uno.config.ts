import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media",
    }),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: "Lexend",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
