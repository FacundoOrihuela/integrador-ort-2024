import React, { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    const fetchUser = useCallback(async () => {
        if (token) {
            console.log(token)
            try {
                const response = await fetch("http://localhost:3001/api/user/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Error al obtener el usuario");
                const data = await response.json();
                setUser(data.user);
            } catch (err) {
                console.error("Error:", err);
                toast.error("Ocurrió un error al obtener los datos del usuario.");
            }
        }
    }, [token]);

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