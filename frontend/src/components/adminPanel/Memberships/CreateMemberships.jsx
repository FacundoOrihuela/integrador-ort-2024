import React, { useState, useEffect } from "react";

const CreateMemberships = ({
  editData,
  isUpdate,
  handleUpdateOrCreate,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        price: editData.price,
        duration: editData.duration,
      });
    }
  }, [editData, isUpdate]);

  const handleSaveMembership = async () => {
    const url = isUpdate
      ? `http://localhost:3001/api/memberships/${editData.id}`  // PUT para editar
      : "http://localhost:3001/api/memberships";  // POST para crear

    const method = isUpdate ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLocalMessage(isUpdate ? "Membresía actualizada exitosamente!" : "Membresía creada exitosamente!");
        handleUpdateOrCreate();  // Actualiza la lista de membresías
        setIsModalOpen(false);   // Cierra el modal después de guardar
      } else {
        const errorData = await response.json();
        setError(`${errorData.message || "Algo salió mal"}`);
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">
          {isUpdate ? "Editar Membresía" : "Crear Membresía"}
        </h1>
        <div className="space-y-1">
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
          onClick={handleSaveMembership}
          className="w-full bg-colors-1 text-white p-2 rounded mt-4 hover:bg-colors-1"
        >
          {isUpdate ? "Actualizar Membresía" : "Crear Membresía"}
        </button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateMemberships;
