import React, { useEffect, useState } from "react";

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/memberships")
      .then((respuesta) => {
        if (!respuesta.status === 200) {
          throw new Error("Error al obtener las membresías");
        }
        return respuesta.json();
      })

      .then((dataMembresias) => {
        // Guardo las Membresias
        setMemberships(dataMembresias.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // Mostrar un mensaje si ocurre un error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <h1
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          fontSize: "40px",
        }}
      >
        Lista de Membresías
      </h1>

      <ul>
        {memberships.map((membresia) => (
          <li key={membresia.id}>
            <p> <span className="font-bold"> Nombre:</span> {membresia.name}</p>
            <p> <span className="font-bold"> Descripcion:</span> {membresia.description}</p>
            <p> <span className="font-bold"> Precio:</span> {membresia.price}</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipList;
