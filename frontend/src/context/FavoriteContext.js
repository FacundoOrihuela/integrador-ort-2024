import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        if (user) {
            fetchFavorite();
        }
    }, [user]);

    const fetchFavorite = () => {
        if (user) {
            fetch(`http://localhost:3001/api/favorites`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setFavorite(data.favorite.FavoriteItems))
                .catch((error) => console.error('Error fetching favorite:', error));
        }
    };

    const addToFavorite = (product) => {
        if (user) {
            fetch(`http://localhost:3001/api/favorite/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setFavorite((prevFavorite) => {
                        const existingProduct = prevFavorite.find((item) => item.productId === product.id);
                        if (existingProduct) {
                            return prevFavorite.map((item) =>
                                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
                            );
                        } else {
                            return [...prevFavorite, { ...data.favoriteItem, Product: product }];
                        }
                    });
                })
                .catch((error) => console.error('Error adding to favorite:', error));
        }
    };

    const removeFromFavorite = (productId) => {
        if (user) {
            fetch(`http://localhost:3001/api/favorite/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId }),
            })
                .then((response) => response.json())
                .then(() => {
                    setFavorite((prevFavorite) => prevFavorite.filter((item) => item.productId !== productId));
                })
                .catch((error) => console.error('Error removing from favorite:', error));
        }
    };

    const decreaseQuantity = (productId) => {
        if (user) {
            fetch(`http://localhost:3001/api/favorite/decrease`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId }),
            })
                .then((response) => response.json())
                .then(() => {
                    setFavorite((prevFavorite) => {
                        const existingProduct = prevFavorite.find((item) => item.productId === productId);
                        if (existingProduct && existingProduct.quantity > 1) {
                            return prevFavorite.map((item) =>
                                item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
                            );
                        } else {
                            return prevFavorite.filter((item) => item.productId !== productId);
                        }
                    });
                })
                .catch((error) => console.error('Error decreasing quantity:', error));
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorite, setFavorite, addToFavorite, removeFromFavorite, decreaseQuantity, fetchFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};