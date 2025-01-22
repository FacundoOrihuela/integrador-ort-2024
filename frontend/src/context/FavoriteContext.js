import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import config from "../utils/config.json";

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
            fetch(`${config.apiUrl}/api/favorites/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setFavorite(data))
                .catch((error) => console.error('Error fetching favorite:', error));
        }
    };

    const addToFavorite = (product) => {
        if (user) {
            fetch(`${config.apiUrl}/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ userId: user.id, productId: product.id }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setFavorite((prevFavorite) => [...prevFavorite, { ...data, Product: product }]);
                })
                .catch((error) => console.error('Error adding to favorite:', error));
        }
    };

    const removeFromFavorite = (productId) => {
        if (user) {
            fetch(`${config.apiUrl}/api/favorites`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ userId: user.id, productId }),
            })
                .then((response) => response.json())
                .then(() => {
                    setFavorite((prevFavorite) => prevFavorite.filter((item) => item.productId !== productId));
                })
                .catch((error) => console.error('Error removing from favorite:', error));
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorite, setFavorite, addToFavorite, removeFromFavorite, fetchFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};