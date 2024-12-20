import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para la redirección

const RegisterAlert = ({ open, onClose }) => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // redirección al registro
  const handleRegisterRedirect = () => {
    navigate("/register"); 
    onClose(); // Cierra la alerta cuando se hace clic
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¡Necesitas registrarte!</DialogTitle>
      <DialogContent>
        Para acceder a esta sección, por favor regístrate o inicia sesión.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={handleRegisterRedirect} color="primary">
          Ir al Registro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterAlert;
