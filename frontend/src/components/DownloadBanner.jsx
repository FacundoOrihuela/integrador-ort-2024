import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const DownloadBanner = ({ open, onClose }) => {
  const handleDownload = () => {
    // Lógica para descargar la PWA
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        window.deferredPrompt = null;
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
        <Typography variant="h6" component="h2">
          Descarga nuestra app
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownload} sx={{ marginTop: '10px' }}>
          Descargar
        </Button>
        <Button variant="text" color="secondary" onClick={onClose} sx={{ marginTop: '10px' }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default DownloadBanner;