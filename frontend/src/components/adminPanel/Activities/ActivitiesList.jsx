import React, { useEffect, useState } from "react";
import CreateActivity from "./CreateActivity";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);

  const fetchActivities = () => {
    fetch("http://localhost:3001/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las actividades.");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setActivities(activities.filter((activity) => activity.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar la actividad.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (activity) => {
    setEditData(activity);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    fetchActivities();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleCreateModal}
          className="bg-colors-1 text-white px-4 py-2 rounded"
        >
          Crear Actividad
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Lista de Actividades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-colors-1 mb-2">
              {activity.name}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Descripción:</span> {activity.description}
            </p>
            <p className="text-gray-900">
              <h2 className="font-bold">Desde:</h2>
              <p>
                {new Date(activity.SingleEvent.startDateTime).toLocaleDateString()}
                <span className="font-bold"> - </span>
                {new Date(activity.SingleEvent.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <h2 className="font-bold">Hasta:</h2>
              <p>
                {new Date(activity.SingleEvent.endDateTime).toLocaleDateString()}
                <span className="font-bold"> - </span>
                {new Date(activity.SingleEvent.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => openEditModal(activity)}
                className="w-[50%] bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(activity.id)}
                className="w-[50%] bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleCreateModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateActivity handleUpdateOrCreate={handleUpdateOrCreate} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateActivity
              editData={editData}
              isUpdate
              handleUpdateOrCreate={handleUpdateOrCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesList;
