/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#e0e0e0",
          300: "#d0d0d0",
          400: "#c0c0c0",
          500: "#b0b0b0",
          600: "#a0a0a0",
          700: "#808080",
          800: "#606060",
          900: "#404040",
        },
        secondary: {
          50: "#f8f0f0",
          100: "#f0e0e0",
          200: "#e0c0c0",
          300: "#d0a0a0",
          400: "#c08080",
          500: "#b06060",
          600: "#a04040",
          700: "#802020",
          800: "#601010",
          900: "#400808",
        },
        accent: {
          50: "#f0f8f8",
          100: "#e0f0f0",
          200: "#c0e0e0",
          300: "#a0d0d0",
          400: "#80c0c0",
          500: "#60b0b0",
          600: "#40a0a0",
          700: "#208080",
          800: "#106060",
          900: "#084040",
        },
      },
    },
  },
  plugins: [],
}
