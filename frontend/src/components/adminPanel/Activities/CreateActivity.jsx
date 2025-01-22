import React, { useState, useEffect } from "react";
import config from "../../../utils/config.json";


const CreateActivity = ({editData ,isUpdate ,handleUpdateOrCreate ,setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventType: "single",
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
    recurrencePattern: { type: "weekly", days: [], startTime: "", endTime: "" },
  });

  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        eventType: editData.eventType,
        startDateTime: editData.SingleEvent ? editData.SingleEvent.startDateTime :null,
        endDateTime: editData.SingleEvent ? editData.SingleEvent.endDateTime :null,
        recurrencePattern: editData.RecurringEvent ? editData.RecurringEvent.recurrencePattern : null,
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

  const handleRecurrenceChange = (field, value) => {
    setFormData({
      ...formData,
      recurrencePattern: { ...formData.recurrencePattern, [field]: value },
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.description ||
      (formData.eventType === "recurring"
        ? !formData.recurrencePattern.days.length ||
          !formData.recurrencePattern.startTime ||
          !formData.recurrencePattern.endTime
        : !formData.startDateTime || !formData.endDateTime)
    ) {
      setError("Por favor, completa todos los campos.");
      return false;
    }

    if (formData.eventType !== "recurring" && (new Date(formData.startDateTime) >= new Date(formData.endDateTime))) {
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
      ? `${config.apiUrl}/api/events/${editData.id}`
      : `${config.apiUrl}/api/events/create`;

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
      className="flex flex-col items-center justify-center bg-white w-full max-w-md"
      onSubmit={handleSaveActivity}
    >
      <h1 className="text-xl font-bold mb-4">
        {isUpdate ? "Editar Actividad" : "Crear Actividad"}
      </h1>
      <div className="space-y-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

       {!isUpdate && <div>
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
        </div>}

        {formData.eventType === "recurring" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Patrón de Recurrencia</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Días de la Semana</label>
                  <div className="flex flex-col">
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                      <label key={day} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={day}
                          checked={formData.recurrencePattern.days.includes(day)}
                          onChange={(e) => {
                            const updatedDays = e.target.checked
                              ? [...formData.recurrencePattern.days, e.target.value]
                              : formData.recurrencePattern.days.filter((d) => d !== e.target.value);
                            handleRecurrenceChange("days", updatedDays);
                          }}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Hora de Inicio</label>
                  <input
                    type="time"
                    value={formData.recurrencePattern.startTime}
                    onChange={(e) =>
                      handleRecurrenceChange("startTime", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium">Hora de Fin</label>
                  <input
                    type="time"
                    value={formData.recurrencePattern.endTime}
                    onChange={(e) =>
                      handleRecurrenceChange("endTime", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        )}
        
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
