import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import config from "../../../utils/config.json";

const CreateNews = ({ handleUpdateOrCreate, editData, setEditData, isUpdate, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setLocalMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUpdate && editData.id) {
      setFormData({
        title: editData.title,
        content: editData.content,
        photo: editData.photo,
      });
    }
  }, [editData, isUpdate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const handleSaveNews = async () => {
    const url = isUpdate
      ? `${config.apiUrl}/api/news/${editData.id}`
      : `${config.apiUrl}/api/news`;

    const method = isUpdate ? "PUT" : "POST";

    const newsFormData = new FormData();
    newsFormData.append("title", formData.title);
    newsFormData.append("content", formData.content);
    if (selectedFile) {
      newsFormData.append("photo", selectedFile);
    }

    try {
      const response = await axios({
        method: method,
        url: url,
        data: newsFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setLocalMessage(isUpdate ? "Noticia actualizada exitosamente!" : "Noticia creada exitosamente!");
        handleUpdateOrCreate();
        setIsModalOpen(false);
      } else {
        setError(`${response.data.message || "Algo salió mal"}`);
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">
          {isUpdate ? "Editar Noticia" : "Crear Noticia"}
        </h1>
        <div className="space-y-1">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <TextField
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contenido</label>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Imagen</label>
            <input
              type="file"
              onChange={handleFileChange}
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
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveNews}
          className="w-full mt-4"
        >
          {isUpdate ? "Actualizar Noticia" : "Crear Noticia"}
        </Button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateNews;