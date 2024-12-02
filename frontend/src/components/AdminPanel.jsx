import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminPanel = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        
    useEffect(() => {
        if (user === null) {
            return;
        }
        if (!user || user.userType !== "administrator") {
            navigate("../*");
        }
    }, [user, navigate]);

 

    useEffect(() => {
        // Realiza la solicitud GET
        fetch('http://localhost:3001/api/clients', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }
                return response.json();
            })
            .then((data) => {
                setClients(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Mostrar un mensaje mientras se cargan los datos
    if (loading) {
        return <div>Cargando clientes...</div>;
    }

    // Mostrar un mensaje si ocurre un error
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (user === null) {
        return <div>Cargando...</div>;
    }


    return (
        <div>
            <h1 style={{ justifyContent: "center", alignItems: "center", padding: "150px" }}>Listado de Usuarios</h1>

            <ul>
                {clients.map((client) => (
                    <li key={client.userId}>
                        <p> Nombre: {client.User.name}</p>
                        <p>Email: {client.User.email}</p>
                        <br/>
                    </li>
                ))}
            </ul>


            <Header />
            <Sidebar />   
        </div>
    );
};

export default AdminPanel;