/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    extend: {
      colors: {
        purp: {
          1: "#EBF2FF",
          10: "#B3C7F7",
          25: "#9FB9F7",
          50: "#75BDF1",
          100: "#579DF3",
          200: "#426FF5",
          300: "#2E51F6",
          400: "#1A32F7",
          500: "#0E13F7",
          600: "#0A0FC4",
          700: "#070B93",
          800: "#04076E",
          900: "#020349",
          950: "#000235",
        },
      },
    },
  },
  plugins: [],
};
