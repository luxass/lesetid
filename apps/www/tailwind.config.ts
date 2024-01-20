import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      sans: ["DM Sans", "sans-serif"],
    },
  },
};
