import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, TextField, Pagination } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import OrderDetailsModal from './OrderDetailsModal';

const ShoppingList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [openOrder, setOpenOrder] = useState(null);
    const [page, setPage] = useState(1);
    const ordersPerPage = 8;

    useEffect(() => {
        axios.get('http://localhost:3001/api/orders/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            setOrders(response.data.orders);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setError('Error al obtener las órdenes');
            setLoading(false);
        });
    }, []);

    const handleOpenOrder = (order) => {
        setOpenOrder(order);
    };

    const handleCloseOrder = () => {
        setOpenOrder(null);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredOrders = orders.filter((order) => {
        return order.User.name.toLowerCase().includes(search.toLowerCase());
    });

    const paginatedOrders = filteredOrders.slice((page - 1) * ordersPerPage, page * ordersPerPage);

    // Mostrar un mensaje si ocurre un error
    if (error) {
        return (
            <Paper className="p-4 m-4">
                <Box className="flex items-center">
                    <ErrorIcon className="mr-2" /> Error: {error}
                </Box>
            </Paper>
        );
    }

    // Mostrar un mensaje mientras se cargan los datos
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CircularProgress />
                <Box className="ml-2">Cargando órdenes...</Box>
            </div>
        );
    }

    return (
        <Paper className="p-4 m-4">
            <Box className="flex justify-between mb-4">
                <TextField
                    label="Buscar por nombre de usuario"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ marginRight: 2 }}
                />
            </Box>
            <List>
                {paginatedOrders.map((order) => (
                    <ListItem 
                        key={order.id} 
                        className="mb-2 bg-gray-100 rounded-lg shadow-md" 
                        onClick={() => handleOpenOrder(order)} 
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                borderColor: 'primary.main',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            },
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <ShoppingCartIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box component="span" className="flex items-center">
                                    {order.User.name}
                                </Box>
                            }
                            secondary={
                                <>
                                    <Box component="span" className="flex items-center">
                                        Email: {order.User.email}
                                    </Box>
                                    <Box component="span" className="flex items-center">
                                        Fecha: {new Date(order.createdAt).toLocaleDateString()}
                                    </Box>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={Math.ceil(filteredOrders.length / ordersPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            {openOrder && (
                <OrderDetailsModal
                    order={openOrder}
                    onClose={handleCloseOrder}
                />
            )}
        </Paper>
    );
};

export default ShoppingList;
