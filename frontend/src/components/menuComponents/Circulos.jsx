import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import circulosImage from "../img/circulos.jpg"; // Asegúrate de tener esta imagen en la carpeta correcta
import Footer from "../Footer";
import Header from "../Header"; // Asegúrate de importar el Header si es necesario

const Circulos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${circulosImage})` }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "70vh",
            padding: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Círculos de crecimiento
          </Typography>
          <Typography>
            Contenido de los Círculos de crecimiento...
          </Typography>
        </Box>
      </Box>
      <Footer />
    </motion.div>
  );
};

export default Circulos;