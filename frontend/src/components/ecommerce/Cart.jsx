import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Cart = () => {
    const { cart, removeFromCart, decreaseQuantity } = useContext(CartContext);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);
    };

    return (
        <Box className="absolute top-16 right-0 w-64 bg-white shadow-lg p-4">
            <Typography variant="h6" className="text-black font-bold mb-4">Carrito de Compras</Typography>
            {cart.length === 0 ? (
                <Typography className="text-black">El carrito está vacío</Typography>
            ) : (
                <List>
                    {cart.map((item) => (
                        <ListItem key={item.id} className="relative flex mb-2">
                            <ListItemAvatar>
                                <Avatar
                                    src={`http://localhost:3001${item.Product.image}`}
                                    alt={item.Product.name}
                                    className="w-full h-16 object-cover"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<span className="font-bold text-black">{item.Product.name}</span>}
                                secondary={<span className="text-black">{item.quantity}x ${item.priceAtAddition}</span>}
                            />
                            <div className="absolute top-0 right-0 flex space-x-2">
                                <IconButton
                                    onClick={() => decreaseQuantity(item.productId)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded-full"
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => removeFromCart(item.productId)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-full"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
            <Box className="mt-4">
                <Typography variant="h6" className="text-black font-bold">Subtotal: ${calculateSubtotal().toFixed(2)}</Typography>
            </Box>
        </Box>
    );
};

export default Cart;