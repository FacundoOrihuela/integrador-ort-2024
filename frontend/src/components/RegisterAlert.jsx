import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterAlert = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¡Necesitas registrarte!</DialogTitle>
      <DialogContent>
        Para acceder a esta funcionalidad, por favor regístrate o inicia sesión.
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
