import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line ts/no-require-imports
    require("@tailwindcss/typography"),
  ],
};
export default config;
