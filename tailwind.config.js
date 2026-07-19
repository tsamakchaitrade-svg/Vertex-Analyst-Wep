/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        blue:    "#1E6FFF",
        cyan:    "#00C2FF",
        silver:  "#C0C8D8",
        navy:    "#050A12",
        surface: "#0A1220",
      },
    },
  },
  plugins: [],
};
