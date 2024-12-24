import React, { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        if (token) {
            try {
                const response = await fetch("http://localhost:3001/api/user/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Token inválido o expirado");
                const data = await response.json();
                setUser(data.user);
            } catch (err) {
                toast.error("El token ha expirado. Por favor, inicia sesión nuevamente.");
                logout();
                navigate("/login");
            }
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};