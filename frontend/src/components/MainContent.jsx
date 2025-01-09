import { Box } from "@mui/material";
import { motion } from "framer-motion";
import portadaImg from "../components/img/portrait.jpg";
import tiferetLogo from "../components/img/logoSinTexto.png";
import Footer from "./Footer";
import Header from "./Header";

const MainContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${portadaImg})` }}
    >
      <Header/>
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
          component="img"
          src={tiferetLogo}
          alt="Yoga Session"
          sx={{ objectFit: "cover" }}
        />
      </Box>
      <Footer />
    </motion.div>
  );
};

export default MainContent;