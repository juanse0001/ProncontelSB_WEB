/** @type {import('tailwindcss').Config} */
// tailwind.config.cjs
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal
        primary: {
          50: '#f0f9ff',   // Azul muy claro
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',  // Azul principal
          500: '#0ea5e9',
          600: '#0284c7',  // Azul oscuro
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fafafa',   // Gris neutro
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',  // Gris medio
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',  // Gris oscuro
          900: '#18181b',
        },
        accent: {
          50: '#f0fdf4',   // Verde esmeralda
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',  // Verde principal
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      }
    }
  }
}

