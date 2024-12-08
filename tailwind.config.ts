import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      maxWidth: {
        "8xl": "1408px",
        "9xl": "1536px",
        "10xl": "1664px",
      },
    },
  },
  plugins: [],
} satisfies Config;
