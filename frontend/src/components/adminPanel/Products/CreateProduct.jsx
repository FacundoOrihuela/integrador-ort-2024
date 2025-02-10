import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../utils/config.json";

const CreateProduct = ({ editData, isUpdate, handleUpdateOrCreate, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
    file:"",
  });
  const [categories, setCategories] = useState([]);
  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (isUpdate && editData.id) {
      console.log(editData)
      setFormData({
        name: editData.name,
        description: editData.description,
        price: editData.price,
        stock: editData.stock,
        categoryId: editData.categoryId,
        image: editData.image,
        file: editData.file,
      });
      setSelectedImage(editData.image)
      setSelectedFile(editData.file)
    }
  }, [editData, isUpdate]);

  useEffect(() => {
    fetch(`${config.apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
        if (!isUpdate) {
          setFormData((prevFormData) => ({ ...prevFormData, categoryId: data.data[0]?.id || "" }));
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [isUpdate]);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);

  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.categoryId || !selectedImage || !selectedFile) {
      setError("Por favor, completa todos los campos.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) return;

    const url = isUpdate ? `${config.apiUrl}/api/products/${editData.id}` : `${config.apiUrl}/api/products`;
    const method = isUpdate ? "PUT" : "POST";
    const productFormData = new FormData();
    
    Object.keys(formData).forEach((key) => productFormData.append(key, formData[key]));
    if (selectedImage) productFormData.append("image", selectedImage);
    if (selectedFile) productFormData.append("file", selectedFile);

    try {
      const response = await axios({ method, url, data: productFormData, headers: { "Content-Type": "multipart/form-data" } });
      if (response.status === 200 || response.status === 201) {
        setLocalMessage(isUpdate ? "Producto actualizado exitosamente!" : "Producto creado exitosamente!");
        handleUpdateOrCreate();
        setIsModalOpen(false);
      } else {
        setError(response.data.message || "Algo salió mal");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-4">{isUpdate ? "Editar Producto" : "Crear Producto"}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} className="w-full p-2 border rounded">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
          <div>
            <label className="block text-sm font-medium">Imagen</label>
            <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded w-full" />
            {/*formData.image && <img src={formData.image} alt="Product" className="mt-2 w-[50%] h-[50%] object-cover" />*/}
          </div>
          <div>
            <label className="block text-sm font-medium">Archivo</label>
            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded w-full" />
          </div>
        <button onClick={handleSaveProduct} className="w-full bg-colors-1 text-white p-2 rounded mt-4 hover:bg-colors-1">
          {isUpdate ? "Actualizar Producto" : "Crear Producto"}
        </button>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateProduct;
