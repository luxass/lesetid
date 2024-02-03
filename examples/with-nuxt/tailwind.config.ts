import type { Config } from "tailwindcss";

export default <Partial<Config>> {
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line ts/no-require-imports
    require("@tailwindcss/typography"),
  ],
};
