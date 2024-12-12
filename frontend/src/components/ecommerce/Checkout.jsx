import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Header from '../Header';

const Checkout = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [localCart, setLocalCart] = useState(cart);
    console.log("Carrito", cart);
    

    useEffect(() => {
        setLocalCart(cart);
    }, [cart]);

    const calculateSubtotal = () => {
        return localCart.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);
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

    return (
        <div>
            <Header />
            <Box className="container mx-auto p-4 mt-[5rem]">
                <Typography variant="h4" className="text-black font-bold mb-4">Checkout</Typography>
                <List>
                    {localCart.map(item => (
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
                    <Button
                        variant="contained"
                        color="primary"
                        className="w-full mt-4"
                        onClick={handlePlaceOrder}
                    >
                        Finalizar Compra
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Checkout;