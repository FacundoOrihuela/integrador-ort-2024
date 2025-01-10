import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const CreateUser = ({ handleUpdateOrCreate, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "teacher", // Default to teacher
    specialty: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSaveUser = async () => {
    let endpoint = "";
    let body = {};

    switch (formData.userType) {
      case "teacher":
        endpoint = "http://localhost:3001/api/teachers";
        body = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          specialty: formData.specialty,
          description: formData.description,
        };
        break;
      case "administrator":
        endpoint = "http://localhost:3001/api/administrators";
        body = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        break;
      default:
        setError("Tipo de usuario no válido");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage("Usuario creado exitosamente!");
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
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md">
        <Typography variant="h5" className="mb-4">
          Crear Usuario
        </Typography>
        <div className="space-y-4">
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <TextField
            label="Tipo de Usuario"
            variant="outlined"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            value={formData.userType}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          >
            <option value="teacher">Profesor</option>
            <option value="administrator">Administrador</option>
          </TextField>
          {formData.userType === "teacher" && (
            <>
              <TextField
                label="Especialidad"
                variant="outlined"
                fullWidth
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </>
          )}
        </div>
        <Button
          onClick={handleSaveUser}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }} // Aplicar margen superior con Material UI
          className="w-full"
        >
          Crear Usuario
        </Button>

        {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </div>
    </div>
  );
};

export default CreateUser;