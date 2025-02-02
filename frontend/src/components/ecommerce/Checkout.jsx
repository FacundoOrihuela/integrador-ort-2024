import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { Box, Typography, Button, List, ListItem, ListItemText, Avatar, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer'; // Asegúrate de tener un componente Footer
import config from "../../utils/config.json";

const Checkout = () => {
    const { cart, fetchCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);
    };

    const handleOrderMP = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${config.apiUrl}/api/mercadopago/create-order`, {
                email: user.email,
                name: user.name,
                items: cart.map(item => ({
                    product: {
                        id: item.Product.id,
                        name: item.Product.name,
                        description: item.Product.description,
                        price: item.Product.price,
                        stock: item.Product.stock,
                        categoryId: item.Product.categoryId,
                        image: item.Product.image,
                        file: item.Product.file,
                        timesSold: item.Product.timesSold
                    },
                    priceAtPurchase: item.priceAtAddition,
                    quantity: item.quantity
                }))
            });

            const result = response.data;
            console.log("Respuesta de MercadoPago:", result);

            if (result.url) {
                window.location.href = result.url; // Redirigir a la URL de pago de MercadoPago
            }
        } catch (error) {
            console.error("Error al crear la sesión de MercadoPago:", error);
            setLoading(false);
        }
    };

    const handleBackToStore = () => {
        navigate('/store');
    };

    return (
        <div>
            <Header />
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Box display="flex" justifyContent="center"  flexGrow={1}>
                    <Paper className="p-10 m-4" sx={{ width: '60vw', minWidth: '800px' }}>
                        <Typography variant="h4" className="text-black font-bold mb-4">Resúmen</Typography>
                        {cart.length === 0 ? (
                            <Box className="text-center">
                                <Typography variant="h6" className="text-black mb-4">No hay productos en el carrito.</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to="/store"
                                    sx={{ borderColor: 'primary.main', color: 'primary.main', backgroundColor: 'white' }}
                                >
                                    Volver a la tienda
                                </Button>
                            </Box>
                        ) : (
                            <>
                                <List>
                                    {cart.map(item => {
                                        // Extraer la ruta relativa de la URL de Cloudinary
                                        const cloudinaryUrl = new URL(item.Product.image);
                                        const relativePath = cloudinaryUrl.pathname;

                                        // Construir la URL de Imgix basada en la ruta relativa
                                        const imgixUrl = `https://tiferet-689097844.imgix.net${relativePath}`;

                                        return (
                                            <ListItem key={item.id} className="flex items-center">
                                                <Avatar
                                                    src={`${imgixUrl}?w=64&h=64&fit=crop`}
                                                    alt={item.Product.name}
                                                    sx={{ width: 64, height: 64, marginRight: 2 }}
                                                />
                                                <ListItemText
                                                    primary={`${item.Product.name} - $${item.priceAtAddition.toFixed(2)}`}
                                                    secondary={`Cantidad: ${item.quantity}`}
                                                    className="text-black"
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                                <Box className="mt-4">
                                    <Typography variant="h6" className="text-black font-bold">Total: ${calculateSubtotal().toFixed(2)}</Typography>
                                    <Box className="flex space-x-4 mt-4">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="w-full"
                                            onClick={handleBackToStore}
                                            sx={{ borderColor: 'primary.main', color: 'primary.main', backgroundColor: 'white' }}
                                        >
                                            Volver a la tienda
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="w-full"
                                            onClick={handleOrderMP}
                                            disabled={loading}
                                            sx={{ color: 'white' }}
                                        >
                                            {loading ? <CircularProgress size={24} /> : 'Finalizar Compra'}
                                        </Button>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Paper>
                </Box>
                <Footer />
            </Box>
        </div>
    );
};

export default Checkout;