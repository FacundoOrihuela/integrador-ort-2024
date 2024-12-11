import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Box, Typography, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import Header from './Header';

const PurchaseHistory = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [openOrderId, setOpenOrderId] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:3001/api/orders', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(response => setOrders(response.data.orders))
            .catch(error => console.error('Error fetching orders:', error));
        }
    }, [user]);

    const handleToggle = (orderId) => {
        setOpenOrderId(openOrderId === orderId ? null : orderId);
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
                                    {order.OrderItems.map(item => (
                                        <ListItem key={item.id} className="pl-8">
                                            <ListItemText
                                                primary={`${item.Product.name} - $${item.priceAtPurchase.toFixed(2)}`}
                                                secondary={`Cantidad: ${item.quantity}`}
                                                className="text-black"
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default PurchaseHistory;