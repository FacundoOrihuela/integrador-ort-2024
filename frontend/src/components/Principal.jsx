import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import MainContent from "./MainContent";
import Kabala from "./menuComponents/Kabala";
import Circulos from "./menuComponents/Circulos";
import Yoga from "./menuComponents/Yoga";
import Integraciones from "./menuComponents/Integraciones";
import Psicoterapias from "./menuComponents/Psicoterapias";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Principal = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Menu />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <MainContent />
                </motion.div>
              }
            />
            <Route
              path="/kabala"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Kabala />
                </motion.div>
              }
            />
            <Route
              path="/circulos"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Circulos />
                </motion.div>
              }
            />
            <Route
              path="/yoga"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Yoga />
                </motion.div>
              }
            />
            <Route
              path="/integraciones"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Integraciones />
                </motion.div>
              }
            />
            <Route
              path="/psicoterapias"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Psicoterapias />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default Principal;