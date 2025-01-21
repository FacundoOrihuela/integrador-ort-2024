import React, { useState, useEffect } from "react";

const EditGroup = ({ editData, isUpdate, handleUpdateOrCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    leader: null, // Añadido para manejar el líder
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        leader: editData.userId,
        image: editData.photo,
      });
    }
  }, [editData, isUpdate]);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("El nombre del grupo es obligatorio.");
      return false;
    }
    if (!formData.description.trim()) {
      setError("La descripción del grupo es obligatoria.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file || formData.image });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("userId", formData.leader);

    if (formData.image) {
      if (typeof formData.image === "string") {
        formDataToSend.append("image", formData.image);
      } else {
        formDataToSend.append("image", formData.image);
      }
    }

    try {
      const response = await fetch(
        isUpdate
          ? `http://localhost:3001/api/groups/${editData.id}`
          : "http://localhost:3001/api/groups",
        {
          method: isUpdate ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        handleUpdateOrCreate();
        setFormData({ name: "", description: "", image: null, leader: null });
        setMessage(isUpdate ? "Grupo actualizado correctamente." : "Grupo creado correctamente.");
      } else {
        setError("Error al guardar el grupo.");
      }
    } catch {
      setError("Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">
          {isUpdate ? "Editar Grupo" : "Crear Grupo"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre del grupo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Imagen</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Eliminamos la sección del líder */}
          <button
            type="submit"
            className="w-full bg-colors-1 text-white p-2 rounded hover:bg-colors-3"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : isUpdate ? "Actualizar Grupo" : "Crear Grupo"}
          </button>
        </form>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default EditGroup;
