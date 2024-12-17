import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Header from '../Header';

const Checkout = () => {
    const { cart, setCart, fetchCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);
    };

    const handlePlaceOrder = () => {
        axios.post('http://localhost:3001/api/orders/create', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            setCart([]);
            navigate('/purchase-history');
        })
        .catch(error => console.error('Error placing order:', error));
    };

    const handleBackToStore = () => {
        navigate('/store');
    };

    return (
        <div>
            <Header />
            <Box className="container mx-auto p-4 mt-[5rem]">
                <Typography variant="h4" className="text-black font-bold mb-4">Checkout</Typography>
                <List>
                    {cart.map(item => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={`${item.Product.name} - $${item.priceAtAddition.toFixed(2)}`}
                                secondary={`Cantidad: ${item.quantity}`}
                                className="text-black"
                            />
                        </ListItem>
                    ))}
                </List>
                <Box className="mt-4">
                    <Typography variant="h6" className="text-black font-bold">Total: ${calculateSubtotal().toFixed(2)}</Typography>
                    <Box className="flex space-x-4 mt-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            className="w-full"
                            onClick={handleBackToStore}
                        >
                            Volver a la tienda
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="w-full"
                            onClick={handlePlaceOrder}
                        >
                            Finalizar Compra
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Checkout;