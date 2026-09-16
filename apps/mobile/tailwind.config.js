/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E11D48",
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          50: "#18181B",
          100: "#27272A",
          200: "#3F3F46",
          300: "#52525B",
          400: "#71717A",
          500: "#A1A1AA",
          600: "#D4D4D8",
          700: "#E4E4E7",
          800: "#F4F4F5",
          900: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        bold: ["InterBold", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
