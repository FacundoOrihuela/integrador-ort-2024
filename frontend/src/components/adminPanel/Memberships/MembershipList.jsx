import React, { useEffect, useState } from "react";
import CreateMemberships from "./CreateMemberships"; // Importar CreateMemberships

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [error, setError] = useState(null);

  // Función para obtener la lista de membresías
  const fetchMemberships = () => {
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
  };

  useEffect(() => {
    fetchMemberships(); // Llamada inicial al cargar el componente
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/memberships/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMemberships(memberships.filter((membresia) => membresia.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar la membresía");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (membresia) => {
    setEditData(membresia);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchMemberships(); // Actualizar la lista después de crear o editar
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-2">
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleCreateModal}
          className="bg-colors-1 text-white px-4 py-2 rounded hover:bg-colors-1"
        >
          Crear Membresía
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Lista de Membresías</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membresia) => (
          <div
            key={membresia.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-colors-1 mb-2">
              {membresia.name}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Descripción:</span> {membresia.description}
            </p>
            <p className="text-gray-900 font-medium">
              <span className="font-bold">Precio:</span> ${membresia.price}
            </p>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => openEditModal(membresia)}
                className="w-[100%] bg-colors-3 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(membresia.id)}
                className="w-[100%] bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear Membresía */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="max-h-[90%] bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleCreateModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateMemberships
              handleUpdateOrCreate={handleUpdateOrCreate}
              setIsModalOpen={setIsCreateModalOpen}
            />
          </div>
        </div>
      )}

      {/* Modal Editar Membresía */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateMemberships
              editData={editData}
              setEditData={setEditData}
              setIsModalOpen={setIsEditModalOpen}
              isUpdate={true}
              handleUpdateOrCreate={handleUpdateOrCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipList;
