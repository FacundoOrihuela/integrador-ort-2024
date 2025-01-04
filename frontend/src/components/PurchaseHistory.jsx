import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Box, Typography, List, ListItem, ListItemText, Collapse, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import Header from './Header';

const PurchaseHistory = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [openOrderId, setOpenOrderId] = useState(null);
    const [openRatingDialog, setOpenRatingDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [userRatings, setUserRatings] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:3001/api/orders', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(response => setOrders(response.data.orders))
            .catch(error => console.error('Error fetching orders:', error));

            axios.get(`http://localhost:3001/api/ratings/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(response => setUserRatings(response.data.data))
            .catch(error => console.error('Error fetching user ratings:', error));
        }
    }, [user]);

    const handleToggle = (orderId) => {
        setOpenOrderId(openOrderId === orderId ? null : orderId);
    };

    const handleDownload = async (fileUrl) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const handleOpenRatingDialog = (product) => {
        setSelectedProduct(product);
        setOpenRatingDialog(true);
    };

    const handleCloseRatingDialog = () => {
        setOpenRatingDialog(false);
        setSelectedProduct(null);
        setRating(0);
    };

    const handleRatingSubmit = () => {
        if (selectedProduct && rating > 0) {
            axios.post(`http://localhost:3001/api/ratings`, {
                userId: user.id,
                productId: selectedProduct.id,
                rating,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(response => {
                handleCloseRatingDialog();
                // Actualizar las calificaciones del usuario
                setUserRatings([...userRatings, { productId: selectedProduct.id, rating }]);
            })
            .catch(error => console.error('Error submitting rating:', error));
        }
    };

    const hasRatedProduct = (productId) => {
        return userRatings.some(rating => rating.productId === productId);
    };

    return (
        <div>
            <Header />
            <Box className="container mx-auto p-4 mt-[5rem]">
                <Typography variant="h4" className="text-black font-bold mb-4">Historial de Compras</Typography>
                <List>
                    {orders.map(order => (
                        <Box key={order.id} className="mb-4 border border-gray-300 rounded-lg p-4">
                            <ListItem button onClick={() => handleToggle(order.id)}>
                                <ListItemText
                                    primary={`Fecha: ${new Date(order.createdAt).toLocaleDateString()}`}
                                    secondary={`Total: $${order.totalAmount.toFixed(2)} - Estado: ${order.status}`}
                                    className="text-black"
                                />
                                {openOrderId === order.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openOrderId === order.id} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {order.OrderItems.map(item => {
                                        // Extraer la ruta relativa de la URL de Cloudinary
                                        const cloudinaryUrl = new URL(item.Product.image);
                                        const relativePath = cloudinaryUrl.pathname;

                                        // Construir la URL de Imgix basada en la ruta relativa
                                        const imgixUrl = `https://tiferet-689097844.imgix.net${relativePath}`;

                                        return (
                                            <ListItem key={item.id} className="pl-8 flex items-center">
                                                <Avatar
                                                    src={`${imgixUrl}?w=64&h=64&fit=crop`}
                                                    alt={item.Product.name}
                                                    sx={{ width: 64, height: 64, marginRight: 2 }}
                                                />
                                                <ListItemText
                                                    primary={`${item.Product.name} - $${item.priceAtPurchase.toFixed(2)}`}
                                                    secondary={`Cantidad: ${item.quantity}`}
                                                    className="text-black"
                                                />
                                                {item.Product.file && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleDownload(item.Product.file)}
                                                        sx={{ marginLeft: 2 }}
                                                    >
                                                        Descargar
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleOpenRatingDialog(item.Product)}
                                                    sx={{ marginLeft: 2 }}
                                                    disabled={hasRatedProduct(item.Product.id)}
                                                >
                                                    {hasRatedProduct(item.Product.id) ? 'Calificado' : 'Calificar'}
                                                </Button>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            </Box>
            <Dialog open={openRatingDialog} onClose={handleCloseRatingDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Calificar Producto</DialogTitle>
                <DialogContent>
                    <Rating
                        name="product-rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        precision={1}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRatingDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleRatingSubmit} color="primary">
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PurchaseHistory;
