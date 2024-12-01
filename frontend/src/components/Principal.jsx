import React, { useEffect, useState } from "react";
import Event from "./event/Event";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const Principal = () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/user/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) throw new Error("Error al obtener el usuario");
            return response.json();
        })
        .then((data) => {
            console.log(data.user)
            setUser(data.user);
        })
        .catch((err) => {
            console.error("Error:", err);
            toast.error("Ocurrió un error al obtener los datos del usuario.");
        });
    }, []);

    return (
        <div>
        <h1 style={{justifyContent: "center",alignItems: "center", padding: "150px",}}> Bienvenido {user.name}</h1>
        <Header />
        <Sidebar />
        </div>
  );
};

export default Principal;
