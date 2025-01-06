import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";

const ActivityDetails = ({ activity, onClose }) => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/event-registrations/event/${activity.id}`);
        setRegistrations(response.data);
      } catch (err) {
        setError("Error al obtener los registros de la actividad.");
      }
    };

    fetchRegistrations();
  }, [activity.id]);

  const handleApprove = async (userId) => {
    try {
      await axios.post("http://localhost:3001/api/event-registrations/approve", {
        userId,
        eventId: activity.id,
      });
      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((registration) =>
          registration.userId === userId
            ? { ...registration, status: "aceptado" }
            : registration
        )
      );
    } catch (err) {
      setError("Error al aprobar el registro.");
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post("http://localhost:3001/api/event-registrations/reject", {
        userId,
        eventId: activity.id,
      });
      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((registration) =>
          registration.userId === userId
            ? { ...registration, status: "rechazado" }
            : registration
        )
      );
    } catch (err) {
      setError("Error al rechazar el registro.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:3001/api/event-registrations/delete", {
        userId: selectedUserId,
        eventId: activity.id,
      });
      setRegistrations((prevRegistrations) =>
        prevRegistrations.filter((registration) => registration.userId !== selectedUserId)
      );
      setConfirmDelete(false);
      setSelectedUserId(null);
    } catch (err) {
      setError("Error al eliminar el registro.");
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleOpenConfirmDelete = (userId) => {
    setSelectedUserId(userId);
    setConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
    setSelectedUserId(null);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{activity.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {activity.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Usuarios Registrados
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {registrations.length === 0 ? (
          <Typography>No hay usuarios registrados.</Typography>
        ) : (
          <List>
            {registrations.map((registration) => (
              <ListItem
                key={registration.userId}
                className={registration.status === "aceptado" ? "bg-green-100" : registration.status === "rechazado" ? "bg-red-100" : "bg-yellow-100"}
              >
                <ListItemText
                  primary={registration.User.name}
                  onClick={() => handleUserClick(registration.userId)}
                  style={{ cursor: "pointer", color: "blue" }}
                />
                <ListItemSecondaryAction>
                  {registration.status === "pendiente" && (
                    <>
                      <IconButton
                        onClick={() => handleApprove(registration.userId)}
                        style={{ color: "green" }}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleReject(registration.userId)}
                        style={{ color: "red" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  )}
                  {(registration.status === "aceptado" || registration.status === "rechazado") && (
                    <IconButton
                      onClick={() => handleOpenConfirmDelete(registration.userId)}
                      style={{ color: "gray" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
      <Dialog open={confirmDelete} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este registro? Esta acción es permanente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ActivityDetails;