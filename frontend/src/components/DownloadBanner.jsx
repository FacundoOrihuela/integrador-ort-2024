import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const DownloadBanner = ({ open, onClose }) => {
  const handleDownload = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        console.log(
          choiceResult.outcome === 'accepted'
            ? 'User accepted the A2HS prompt'
            : 'User dismissed the A2HS prompt'
        );
        window.deferredPrompt = null;
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 260,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          📲 Descarga la app
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Instálala para una mejor experiencia.
        </Typography>
        <Button variant="contained" color="primary" size="small" onClick={handleDownload}>
          Descargar
        </Button>
        <Button variant="outlined" color="secondary" size="small" onClick={onClose}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default DownloadBanner;
