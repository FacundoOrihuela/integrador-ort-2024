import React, { useState, useEffect } from "react";

const CreateGroups = ({ editData, isUpdate, handleUpdateOrCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader: null,
    image: null,
  });
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      } catch {
        setError("Error al conectar con el servidor.");
      }
    };

    fetchTeachers();

    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        leader: editData.userId || null,
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
    if (!formData.leader) {
      setError("Debe seleccionar un líder para el grupo.");
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
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("leaderId", formData.leader);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
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
        if (!isUpdate) {
          const newGroupId = await fetchLatestGroupId();
          if (newGroupId) {
            await addLeader(newGroupId, formData.leader);
          }
        }

        handleUpdateOrCreate();
        setFormData({ name: "", description: "", leader: null, image: null });
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

  const fetchLatestGroupId = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/groups", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const latestGroup = data.data[data.data.length - 1];
        return latestGroup.id;
      } else {
        setError("Error al obtener los grupos.");
        return null;
      }
    } catch {
      setError("Error al conectar con el servidor.");
      return null;
    }
  };

  const addLeader = async (groupId, userId) => {
    try {
      const response = await fetch("http://localhost:3001/api/groups/add-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId, userId }),
      });

      if (!response.ok) {
        setError("Error al asignar líder al grupo.");
      }
    } catch {
      setError("Error al conectar con el servidor.");
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
            </div>
          </div>
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

export default CreateGroups;
