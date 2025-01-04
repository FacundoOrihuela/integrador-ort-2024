import React, { useEffect, useState } from "react";
import CreateGroups from "./CreateGroups";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]);
  

    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/teachers");
        if (response.ok) {
          const data = await response.json();
          setTeachers(data.data);
          console.log("teachers:",teachers)
        } else {
          setError("Error al cargar los profesores.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      }
    };

  const fetchGroups = () => {
    fetch("http://localhost:3001/api/groups", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los grupos");
        }
        return response.json();
      })
      .then((data) => {
        setGroups(data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchGroups();
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/groups/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setGroups(groups.filter((group) => group.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar el grupo");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (group) => {
    setEditData(group);
    setIsEditModalOpen(true);
  };
  const leaderName = (leaderId) => {
    const teacher = teachers.find((teacher) => teacher.User.id === leaderId);
    return teacher ? teacher.User.name : "No encontrado";
  };
  
  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchGroups();
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
          Crear Grupo
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Lista de Grupos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-colors-1 mb-2">
              {group.name}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Descripción:</span> {group.description}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Lider: </span> 
              {leaderName(group.userId)}
            </p>

            {group.photo && (
              <img
                src={group.photo}
                alt={group.name}
                className="w-full h-32 object-cover mb-2"
              />
            )}
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => openEditModal(group)}
                className="w-[50%] bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(group.id)}
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
          <div className="max-h-[90%] bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleCreateModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateGroups
              handleUpdateOrCreate={handleUpdateOrCreate}
              setIsModalOpen={setIsCreateModalOpen}
            />
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
            <CreateGroups
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

export default GroupsList;
