import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Collapse, Avatar } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';

const ShoppingList = () => {
    const [orders, setOrders] = useState([]);
    const [openOrderId, setOpenOrderId] = useState(null);

    useEffect(() => {
        // Fetch de todas las órdenes
        axios.get('http://localhost:3001/api/orders/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => setOrders(response.data.orders))
        .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const handleToggle = (orderId) => {
        setOpenOrderId(openOrderId === orderId ? null : orderId);
    };

    return (
        <div>
            <Box className="container mx-auto p-4 mt-[5rem]">
                <Typography variant="h4" className="text-black font-bold mb-4">Listado de todas las Compras</Typography>
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
                                        const cloudinaryUrl = new URL(item.Product.image);
                                        const relativePath = cloudinaryUrl.pathname;
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
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default ShoppingList;
