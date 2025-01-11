import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const OrderDetailsModal = ({ order, onClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={!!order}
            onClose={onClose}
            aria-labelledby="order-details-title"
            aria-describedby="order-details-description"
        >
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography id="order-details-title" variant="h6" component="h2">
                        Detalles de la Compra
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography id="order-details-description" sx={{ mt: 2 }}>
                    Fecha: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography>
                    Usuario: {order.User.name}
                </Typography>
                <Typography>
                    Email: {order.User.email}
                </Typography>
                <Typography>
                    Total: ${order.totalAmount.toFixed(2)}
                </Typography>
                <Typography>
                    Estado: {order.status}
                </Typography>
                <List>
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
            </Box>
        </Modal>
    );
};

export default OrderDetailsModal;