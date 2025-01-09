import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Asegúrate de importar el contexto del usuario

const Memberships = () => {
    const [memberships, setMemberships] = useState([]);
    const [error, setError] = useState(null);
    const [userMembership, setUserMembership] = useState(null);
    const { user } = useContext(UserContext); // Obtener el usuario del contexto

    useEffect(() => {
        fetch("http://localhost:3001/api/memberships")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al obtener las membresías");
                }
                return respuesta.json();
            })
            .then((dataMembresias) => {
                setMemberships(dataMembresias.data);
            })
            .catch((err) => {
                setError(err.message);
            });

        // Obtener el cliente y su membresía por email
        if (user && user.email) {
            fetch(`http://localhost:3001/api/clients/${user.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        throw new Error("Error al obtener el cliente");
                    }
                    return respuesta.json();
                })
                .then((data) => {
                    setUserMembership(data.data.membershipId);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [user]);

    const handleMembershipAction = (membresia) => {
        const endpoint = userMembership === membresia.id ? "revoke" : "assign";
        fetch(`http://localhost:3001/api/memberships/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                userId: user.id, // Usar el ID del usuario actual del contexto
                membershipId: endpoint === "assign" ? membresia.id : null,
            }),
        })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Error al ${endpoint === "assign" ? "asignar" : "revocar"} la membresía`);
                }
                return respuesta.json();
            })
            .then(() => {
                setUserMembership(endpoint === "assign" ? membresia.id : null);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Membresías</h1>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memberships.map((membresia) => (
                    <li
                        key={membresia.id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            {membresia.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{membresia.description}</p>
                        <p className="text-lg font-bold text-gray-900 mb-4">${membresia.price}</p>
                        <button
                            onClick={() => handleMembershipAction(membresia)}
                            className="bg-colors-1 text-white px-4 py-2 rounded hover:bg-colors-1 transition-colors duration-200"
                        >
                            {userMembership === membresia.id ? "Revocar" : userMembership ? "Actualizar" : "Adquirir"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Memberships;