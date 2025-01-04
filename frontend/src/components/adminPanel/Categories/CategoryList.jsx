import React, { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categories");
      setCategories(response.data.data);
    } catch (err) {
      setError("Error al obtener las categorías");
      toast.error("Error al obtener las categorías");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Verificar si hay productos asignados a la categoría
      const productsResponse = await axios.get(`http://localhost:3001/api/products/category/${id}`);
      const productsData = productsResponse.data;

      if (productsData.data.length > 0) {
        toast.error("No se puede eliminar la categoría porque tiene productos asignados.");
        return;
      }

      const response = await axios.delete(`http://localhost:3001/api/categories/${id}`);

      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
        toast.success("Categoría eliminada exitosamente.");
      } else {
        setError(response.data.message || "Error al eliminar la categoría");
        toast.error(response.data.message || "Error al eliminar la categoría");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      toast.error("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (category) => {
    setEditData(category);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchCategories();
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
          Crear Categoría
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Lista de Categorías</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-colors-1 mb-2">
              {category.name}
            </h3>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => openEditModal(category)}
                className="w-[50%] bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(category.id)}
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
            <CreateCategory
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
            <CreateCategory
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

export default CategoryList;