import React from 'react';
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import config from "../utils/config.json";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    const fetchCart = useCallback(async () => {
        if (user) {
            try {
                const response = await axios.get(`${config.apiUrl}/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCart(response.data.cart.CartItems);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user, fetchCart]);

    const addToCart = async (product) => {
        if (user) {
            try {
                const response = await axios.post(`${config.apiUrl}/api/cart/add`, {
                    productId: product.id,
                    quantity: 1,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCart((prevCart) => {
                    const existingProduct = prevCart.find((item) => item.productId === product.id);
                    if (existingProduct) {
                        return prevCart.map((item) =>
                            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        );
                    } else {
                        return [...prevCart, { ...response.data.cartItem, Product: product }];
                    }
                });
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const removeFromCart = async (productId) => {
        if (user) {
            try {
                await axios.post(`${config.apiUrl}/api/cart/remove`, {
                    productId,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    const decreaseQuantity = async (productId) => {
        if (user) {
            try {
                await axios.post(`${config.apiUrl}/api/cart/decrease`, {
                    productId,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCart((prevCart) => {
                    const existingProduct = prevCart.find((item) => item.productId === productId);
                    if (existingProduct && existingProduct.quantity > 1) {
                        return prevCart.map((item) =>
                            item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
                        );
                    } else {
                        return prevCart.filter((item) => item.productId !== productId);
                    }
                });
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, decreaseQuantity, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};