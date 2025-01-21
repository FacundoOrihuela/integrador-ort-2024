import React, { useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');
  const { fetchCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const isHandledRef = useRef(false);

  useEffect(() => {
    const handlePayment = async () => {
      try {
        const membershipId = localStorage.getItem('membershipId');
        console.log('user', user);
        
        const endpoint = membershipId ? 'http://localhost:3001/api/mercadopago/membership-payment-status' : 'http://localhost:3001/api/mercadopago/payment-status';
        const response = await axios.post(endpoint, {
          status,
          userId: user.id,
          membershipId: membershipId ? membershipId : undefined,
        });

        if (response.data.message === 'Orden creada exitosamente' || response.data.message === 'Membresía asignada exitosamente') {
          console.log(response.data.message);
          fetchCart();
        }
      } catch (error) {
        console.error('Error al manejar el estado del pago:', error);
      } finally {
        localStorage.removeItem('membershipId');
        navigate('/store');
      }
    };

    const intervalId = setInterval(() => {
      if (status === 'success' && user && !isHandledRef.current) {
        isHandledRef.current = true;
        handlePayment();
      }
    }, 500); // Chequea el estado de user cada segundo

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, [status, fetchCart, user, navigate]);

  const getMessage = () => {
    switch (status) {
      case 'success':
        return 'Pago realizado con éxito. Redireccionando a la tienda...';
      case 'failure':
        return 'El pago ha fallado. Redireccionando a la tienda...';
      case 'pending':
        return 'El pago está pendiente. Redireccionando a la tienda...';
      default:
        return 'Estado desconocido. Redireccionando a la tienda...';
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
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
