import React, { useState, useEffect } from "react";

const CreateGroups = ({
  editData,
  isUpdate,
  handleUpdateOrCreate,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader: null,
  });

  const [teachers, setTeachers] = useState([]);
  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/teachers");
        if (response.ok) {
          const data = await response.json();
          setTeachers(data.data);
        } else {
          setError("Error al cargar los profesores.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      }
    };

    fetchTeachers();

    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        leader: editData.leader || null,
      });
    }
  }, [editData, isUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSetLeader = async () => {
    if (!formData.leader) {
      setError("Debes seleccionar un profesor antes de asignarlo como líder.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/groups/${editData.id}/leader`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: formData.leader }),
      });

      if (response.ok) {
        setLocalMessage("Líder actualizado correctamente.");
      } else {
        setError("Error al actualizar el líder.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdateOrCreate(formData);
    setIsModalOpen(false);
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
            <h3 className="text-sm font-medium">Asignar Líder</h3>
            <div className="flex items-center space-x-2">
              <select
                value={formData.leader || ""}
                onChange={(e) =>
                  setFormData({ ...formData, leader: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Seleccionar profesor
                </option>
                {teachers.map((teacher) => (
                  <option key={teacher.userId} value={teacher.userId}>
                    {teacher.User.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleSetLeader}
                className="bg-colors-1 text-white px-4 py-2 rounded hover:bg-colors-3"
              >
                Agregar Líder
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-colors-1 text-white p-2 rounded hover:bg-colors-3"
          >
            {isUpdate ? "Actualizar Grupo" : "Crear Grupo"}
          </button>
        </form>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateGroups;
