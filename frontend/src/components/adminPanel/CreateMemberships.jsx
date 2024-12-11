import React, { useState } from 'react';

const CreateMemberships = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: '',
    duration: '',
  });
  const [message, setMessage] = useState("");

  const handleCreateMembership = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/memberships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Membresía creada exitosamente!");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Algo salió mal"}`);
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">

<h1
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          fontSize: "40px",
        }}
      >
        Crear una Membresia
        </h1>
        
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Crear Membresía</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Duración (días)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={handleCreateMembership}
          className="w-full bg-colors-1 text-white p-2 rounded mt-4 hover:bg-colors-1"
        >
          Crear Membresía
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CreateMemberships;
