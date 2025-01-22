import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../utils/config.json";

const CreateCategory = ({
  editData,
  isUpdate,
  handleUpdateOrCreate,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
      });
    }
  }, [editData, isUpdate]);

  const handleSaveCategory = async () => {
    const url = isUpdate
      ? `${config.apiUrl}/api/categories/${editData.id}`
      : `${config.apiUrl}/api/categories`;

    const method = isUpdate ? "PUT" : "POST";

    try {
      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setLocalMessage(isUpdate ? "Categoría actualizada exitosamente!" : "Categoría creada exitosamente!");
        handleUpdateOrCreate();
        setIsModalOpen(false);
      } else {
        setError(`${response.data.message || "Algo salió mal"}`);
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">
          {isUpdate ? "Editar Categoría" : "Crear Categoría"}
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
        </div>
        <button
          onClick={handleSaveCategory}
          className="w-full bg-colors-1 text-white p-2 rounded mt-4 hover:bg-colors-1"
        >
          {isUpdate ? "Actualizar Categoría" : "Crear Categoría"}
        </button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateCategory;