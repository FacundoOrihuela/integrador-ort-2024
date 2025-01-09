import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import psicoterapiaImage from "../img/psicoterapia.jpg";
import Footer from "../Footer";
import Header from "../Header";

const Psicoterapias = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${psicoterapiaImage})` }}
    >
      <Header/>
      <Box
        sx={{
          flexGrow: 1,
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
            Psicoterapia
          </Typography>
          <Typography>
            Contenido de Psicoterapia...
          </Typography>
        </Box>
      </Box>
      <Footer />
    </motion.div>
  );
};

export default Psicoterapias;