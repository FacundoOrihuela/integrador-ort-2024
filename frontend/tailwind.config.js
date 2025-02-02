/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Breakpoint para pantallas pequeñas
        md: "768px", // Breakpoint para pantallas medianas
        lg: "1024px", // Breakpoint para pantallas grandes
        xl: "1280px", // Breakpoint para pantallas extra grandes
      },
      colors: {
        colors: {
          1: '#FD763E',
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
