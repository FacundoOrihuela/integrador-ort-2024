import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, Avatar, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const OrderDetailsModal = ({ order, onClose }) => {
    return (
        <Dialog open={!!order} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between">
                    Detalles de la Compra
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Fecha: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Usuario: {order.User.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {order.User.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Total: ${order.totalAmount.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetailsModal;