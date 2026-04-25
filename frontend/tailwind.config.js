/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bubble: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        sky: {
          soft: "#e0f2fe",
        },
      },
      fontFamily: {
        display: ["\"Baloo 2\"", "ui-rounded", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
