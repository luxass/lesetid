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
      provider: "google",
      async customFetch(url) {
        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
          },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch font: ${res.status} ${res.statusText}`,
          );
        }

        let result = await res.text();

        const fontFaces = result.match(
          /\/\*([^*]*)\*+(?:[^/*][^*]*\*+)*\/\s*@font-face\s*{([^}]+)}/g,
        );
        if (!fontFaces) throw new Error("No results");
        for (const fontFace of fontFaces) {
          const family = fontFace.match(/font-family:\s*['"](.+?)['"]/i);
          const weight = fontFace.match(/font-weight:\s*(.+?);/i);
          const url = fontFace.match(/url\(.*?\)/gi);
          if (!url) throw new Error("No url");
          if (!family) throw new Error("No family");
          if (!weight) throw new Error("No weight");

          const res = await fetch(url[0].replace(/url\((.*?)\)/i, "$1"));
          const blob = await res.blob();

          await writeFile(
            `./public/fonts/${family[1]
              .replace(/['"]/g, "")
              .toLowerCase()}.woff2`,
            Buffer.from(await blob.arrayBuffer()),
          );
          result = result.replace(
            url[0],
            `url(/fonts/${family[1].replace(/['"]/g, "").toLowerCase()}.woff2)`,
          );
        }

        return result;
      },
      fonts: {
        sans: "Lexend",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
