import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import Header from '../Header';
import { CartContext } from '../../context/CartContext';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');
  const { fetchCart } = useContext(CartContext);
  const isHandledRef = useRef(false); // Para evitar múltiples ejecuciones

  useEffect(() => {
    const handlePayment = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/mercadopago/payment-status', {
          status,
          userId: 1,
        });

        if (response.data.message === 'Orden creada exitosamente') {
          fetchCart();
        }
      } catch (error) {
        console.error('Error al manejar el estado del pago:', error);
      }
    };

    if (status === 'success' && !isHandledRef.current) {
      isHandledRef.current = true; // Marcar como manejado
      handlePayment();
    }

    const timer = setTimeout(() => {
      navigate('/store');
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, navigate, fetchCart]);

  const getMessage = () => {
    switch (status) {
      case 'success':
        return 'Pago realizado con éxito. Redirigiendo a la tienda...';
      case 'failure':
        return 'El pago ha fallado. Redirigiendo a la tienda...';
      case 'pending':
        return 'El pago está pendiente. Redirigiendo a la tienda...';
      default:
        return 'Estado desconocido. Redirigiendo a la tienda...';
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)', // Ajusta el alto para tener en cuenta la altura del header
          backgroundColor: 'secondary.main',
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" className="text-black font-bold mb-4">{getMessage()}</Typography>
          <CircularProgress />
        </Paper>
      </Box>
    </div>
  );
};

export default PaymentStatus;
