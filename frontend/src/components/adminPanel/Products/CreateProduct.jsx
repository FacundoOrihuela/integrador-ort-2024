import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../utils/config.json";

const CreateProduct = ({
  editData,
  isUpdate,
  handleUpdateOrCreate,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para la imagen

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        name: editData.name,
        description: editData.description,
        price: editData.price,
        stock: editData.stock,
        categoryId: editData.categoryId,
        image: editData.image,
      });
    }
  }, [editData, isUpdate]);

  useEffect(() => {
    fetch(`${config.apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
        if (!isUpdate) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            categoryId: data.data[0]?.id || "",
          }));
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [isUpdate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.categoryId ||
      !selectedImage ||
      !selectedFile
    ) {
      setError("Por favor, completa todos los campos.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) {
      return;
    }

    const url = isUpdate
      ? `${config.apiUrl}/api/products/${editData.id}`
      : `${config.apiUrl}/api/products`;

    const method = isUpdate ? "PUT" : "POST";

    const productFormData = new FormData();
    productFormData.append("name", formData.name);
    productFormData.append("description", formData.description);
    productFormData.append("price", formData.price);
    productFormData.append("stock", formData.stock);
    productFormData.append("categoryId", formData.categoryId);
    if (selectedImage) {
      productFormData.append("image", selectedImage);
    }
    if (selectedFile) {
      productFormData.append("file", selectedFile);
    }

    try {
      const response = await axios({
        method: method,
        url: url,
        data: productFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setLocalMessage(
          isUpdate
            ? "Producto actualizado exitosamente!"
            : "Producto creado exitosamente!"
        );
        handleUpdateOrCreate();
        setIsModalOpen(false);
      } else {
        setError(`${response.data.message || "Algo salió mal"}`);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">
          {isUpdate ? "Editar Producto" : "Crear Producto"}
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
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Imagen</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Product"
                className="mt-2 w-full h-auto object-cover"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Archivo</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={handleSaveProduct}
          className="w-full bg-colors-1 text-white p-2 rounded mt-4 hover:bg-colors-1"
        >
          {isUpdate ? "Actualizar Producto" : "Crear Producto"}
        </button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateProduct;
