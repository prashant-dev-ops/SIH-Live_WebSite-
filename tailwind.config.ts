import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1F4D3D",
          hover: "#173B2E",
          light: "#EBF2EE",
          dark: "#143227",
        },
        cream: {
          DEFAULT: "#FAF6EE",
          warm: "#F5EFE1",
          border: "#EAE3D2",
        },
        saffron: {
          DEFAULT: "#D97D3D",
          hover: "#BF692D",
          light: "#FCF2EB",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          muted: "#5C5C5C",
          light: "#8C8C8C",
        },
        warmwhite: "#FFFDF9",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 2px 8px -2px rgba(28, 28, 28, 0.06), 0 1px 4px -1px rgba(28, 28, 28, 0.04)",
        hover: "0 6px 16px -4px rgba(28, 28, 28, 0.08), 0 2px 6px -2px rgba(28, 28, 28, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
