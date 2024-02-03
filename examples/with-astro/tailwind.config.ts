import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line ts/no-require-imports
    require("@tailwindcss/typography"),
  ],
} satisfies Config
