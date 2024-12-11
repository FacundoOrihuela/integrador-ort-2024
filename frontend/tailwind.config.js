/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          1: '#d87d3d',
          2: '#ffdec5',
          3: '#de9800',
          4: '#ffe8ca'
        },
        secondary: '#ffffff', // Color secundario
        tertiary: '#ffe8ca', // Color terciario (blanco puro)
      },
    },
  },
  plugins: [],
};