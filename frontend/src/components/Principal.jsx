import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Menu from './Menu';
import MainContent from './MainContent';
import Kabala from './menuComponents/Kabala';
import Circulos from './menuComponents/Circulos';
import Yoga from './menuComponents/Yoga';
import Integraciones from './menuComponents/Integraciones';
import Psicoterapias from './menuComponents/Psicoterapias';
import { isMobile } from 'react-device-detect';
import 'react-toastify/dist/ReactToastify.css';
import DownloadBanner from './DownloadBanner';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const Principal = () => {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (!isStandalone && isMobile) {
      setShowBanner(true);
    }
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Menu />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    style={{ width: '100%', height: '100%' }}
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
                    style={{ width: '100%', height: '100%' }}
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
                    style={{ width: '100%', height: '100%' }}
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
                    style={{ width: '100%', height: '100%' }}
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
                    style={{ width: '100%', height: '100%' }}
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
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Psicoterapias />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </Box>
      </Box>
      {showBanner && <DownloadBanner open={showBanner} onClose={handleCloseBanner} />}
    </Box>
  );
};

export default Principal;
