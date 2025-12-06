import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ededed",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"], // <--- Asegura que la fuente se aplica
        mono: ["monospace"], // Fuente técnica
      },
    },
  },
  plugins: [],
};
export default config;