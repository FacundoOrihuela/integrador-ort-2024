import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/api/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setCart(data.cart.CartItems))
                .catch((error) => console.error('Error fetching cart:', error));
        }
    }, [user]);

    const addToCart = (product) => {
        if (user) {
            fetch(`http://localhost:3001/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setCart((prevCart) => {
                        const existingProduct = prevCart.find((item) => item.productId === product.id);
                        if (existingProduct) {
                            return prevCart.map((item) =>
                                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
                            );
                        } else {
                            return [...prevCart, { ...data.cartItem, Product: product }];
                        }
                    });
                })
                .catch((error) => console.error('Error adding to cart:', error));
        }
    };

    const removeFromCart = (productId) => {
        if (user) {
            fetch(`http://localhost:3001/api/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId }),
            })
                .then((response) => response.json())
                .then(() => {
                    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
                })
                .catch((error) => console.error('Error removing from cart:', error));
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};