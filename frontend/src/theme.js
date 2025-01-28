import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FD763E', // Color primario de Tailwind (naranja)
    },
    secondary: {
      main: '#ffdec5', // Color secundario de Tailwind
    },
    background: {
      default: '#ffe8ca', // Color de fondo de Tailwind
    },
    text: {
      primary: '#000000', // Color de texto primario (negro)
      secondary: '#000000', // Color de texto secundario
      tertiary: '#ffffff', // Color de texto terciario (blanco puro)
    },
  },
  typography: {
    fontFamily: 'Gafata, sans-serif', // Fuente principal
    secondaryFontFamily: 'Helvetica, sans-serif', // Fuente secundaria (no usada todavía)
  },
});

export default theme;