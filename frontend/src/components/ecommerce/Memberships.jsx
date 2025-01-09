import React, { useEffect, useState } from "react";

const Memberships = () => {
    const [memberships, setMemberships] = useState([]);
    const [error, setError] = useState(null);

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
    }, []);

    const comprar = (membresia) => {
        // Implementar la lógica de compra de membresía
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
                            onClick={() => comprar(membresia)}
                            className="bg-colors-1 text-white px-4 py-2 rounded hover:bg-colors-1 transition-colors duration-200"
                        >
                            Adquirir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Memberships;