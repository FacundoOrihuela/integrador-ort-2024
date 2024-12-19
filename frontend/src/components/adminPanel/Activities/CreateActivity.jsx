import React, { useState, useEffect } from "react";

const CreateActivity = ({
  editData,
  isUpdate,
  handleUpdateOrCreate,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventType: "single",
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
  });

  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        eventType: editData.eventType,
        startDateTime: editData.startDateTime,
        endDateTime: editData.endDateTime,
      });
    }
  }, [editData, isUpdate]);

  const formatDateForInput = (date) => {
    const localDate = new Date(date);
    return localDate.toISOString().slice(0, 16);
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString();
    setFormData({ ...formData, [field]: formattedDate });
  };

  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.startDateTime || !formData.endDateTime) {
      setError("Por favor, completa todos los campos.");
      return false;
    }

    if (new Date(formData.startDateTime) >= new Date(formData.endDateTime)) {
      setError("La fecha de inicio debe ser anterior a la fecha de fin.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSaveActivity = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const url = isUpdate
      ? `http://localhost:3001/api/events/${editData.id}`
      : "http://localhost:3001/api/events/create";

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
        setLocalMessage(isUpdate ? "Actividad actualizada exitosamente!" : "Actividad creada exitosamente!");
        handleUpdateOrCreate();
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        setError(`${errorData.message || "Algo salió mal"}`);
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center bg-whitew-full max-w-md"
      onSubmit={handleSaveActivity}
    >
      <h1 className="text-xl font-bold mb-4">
        {isUpdate ? "Editar Actividad" : "Crear Actividad"}
      </h1>
      <div className="space-y-2 w-full">
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
          <label className="block text-sm font-medium">Tipo de Evento</label>
          <select
            value={formData.eventType}
            onChange={(e) =>
              setFormData({ ...formData, eventType: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="single">Único</option>
            <option value="recurring">Recurrente</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha y Hora de Inicio</label>
          <input
            type="datetime-local"
            value={formatDateForInput(formData.startDateTime)}
            onChange={(e) => handleDateChange("startDateTime", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha y Hora de Fin</label>
          <input
            type="datetime-local"
            value={formatDateForInput(formData.endDateTime)}
            onChange={(e) => handleDateChange("endDateTime", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-colors-1 text-white p-2 rounded mt-4 hover:bg-colors-1"
      >
        {isUpdate ? "Actualizar Actividad" : "Crear Actividad"}
      </button>

      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default CreateActivity;
