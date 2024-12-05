import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza la solicitud GET
    fetch("http://localhost:3001/api/user/all", {
      headers: {
        "Content-Type": "application/json",
      },
    })
  
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los clientes");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

    // Mostrar un mensaje si ocurre un error
    if (error) {
      return <div>Error: {error}</div>;
    }

  // Mostrar un mensaje mientras se cargan los datos
  if (loading) {
    return <div>Cargando clientes...</div>;
  }

  return (
    <div>
      <h1
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          fontSize: "40px",
        }}
      >
        Listado de Usuarios
      </h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p> <span className="font-bold"> Nombre:</span> {user.name}</p>
            <p><span className="font-bold"> Email:</span> {user.email}</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
