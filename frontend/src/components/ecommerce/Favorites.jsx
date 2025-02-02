import React, { useContext } from 'react';
import { FavoriteContext } from '../../context/FavoriteContext';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, ClickAwayListener } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Favorites = ({ onClose }) => {
    const { favorite, removeFromFavorite } = useContext(FavoriteContext);

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Box className="absolute top-16 right-0 w-64 bg-white shadow-lg p-4">
                <Typography variant="h6" className="text-black font-bold mb-4">Favoritos</Typography>
                {favorite.length === 0 ? (
                    <Typography className="text-black">Usted no cuenta con favoritos</Typography>
                ) : (
                    <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {favorite.map((item) => {
                            if (!item.Product) {
                                return null;
                            }

                            // Extraer la ruta relativa de la URL de Cloudinary
                            const cloudinaryUrl = new URL(item.Product.image);
                            const relativePath = cloudinaryUrl.pathname;

                            // Construir la URL de Imgix basada en la ruta relativa
                            const imgixUrl = `https://tiferet-689097844.imgix.net${relativePath}`;

                            return (
                                <ListItem key={item.id} className="relative flex mb-2">
                                    <ListItemAvatar>
                                        <Avatar
                                            src={`${imgixUrl}?w=64&h=64&fit=crop`}
                                            alt={item.Product.name}
                                            className="w-full h-16 object-cover"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<span className="font-bold text-black">{item.Product.name}</span>}
                                        secondary={<span className="text-black">${item.Product.price}</span>}
                                    />
                                    <div className="absolute top-0 right-0 flex space-x-2">
                                        <IconButton
                                            onClick={() => removeFromFavorite(item.productId)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-full"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Box>
        </ClickAwayListener>
    );
};

export default Favorites;