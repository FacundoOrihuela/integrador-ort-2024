import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Box } from "@mui/material";

const Event = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/events");
      if (!response.ok) {
        throw new Error("Error al obtener las actividades.");
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch(`http://localhost:3001/api/event-registrations/user/${user.id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los registros.");
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, [fetchEvents, fetchRegistrations]);

  const handleRegister = async (eventId) => {
    if (!user) {
      toast.error("Por favor, inicia sesión para registrarte en una actividad.");
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch("http://localhost:3001/api/event-registrations/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          eventId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrarte en la actividad.");
      }

      toast.success("Te has registrado exitosamente en la actividad.");
      fetchRegistrations(); // Actualizar la lista de registros después de registrarse
    } catch (err) {
      toast.error("Hubo un problema al intentar registrarte. Intenta de nuevo.");
    } finally {
      setRegistering(false);
    }
  };

  const formatEventDate = (event) => {
    if (event.eventType === "single") {
      return (
        <div>
          <Typography variant="h6">Desde:</Typography>
          <Typography>
            {new Date(event.SingleEvent.startDateTime).toLocaleDateString()}{" "}
            {new Date(event.SingleEvent.startDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography variant="h6">Hasta:</Typography>
          <Typography>
            {new Date(event.SingleEvent.endDateTime).toLocaleDateString()}{" "}
            {new Date(event.SingleEvent.endDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </div>
      );
    } else if (event.eventType === "recurring" && event.RecurringEvent.recurrencePattern) {
      return (
        <div>
          <Typography variant="h6">Frecuencia:</Typography>
          <Typography>
            {event.RecurringEvent.recurrencePattern.days.join(", ")}{" "}
            de {event.RecurringEvent.recurrencePattern.startTime} a{" "}
            {event.RecurringEvent.recurrencePattern.endTime}
          </Typography>
        </div>
      );
    }
  };

  const getRegistrationStatus = (eventId) => {
    const registration = registrations.find((reg) => reg.eventId === eventId);
    if (registration) {
      return registration.status;
    }
    return null;
  };

  if (loading) {
    return <Typography className="text-center">Cargando actividades...</Typography>;
  }

  if (error) {
    return <Typography className="text-center text-red-500">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "secondary",
      }}
    >
      <Header />
      <Box
        sx={{
          backgroundColor: "white",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "auto",
          maxWidth: "70%",
          margin: "2rem auto 2rem auto", // Ajustar el margen superior e inferior
          borderRadius: "8px", // Bordes redondeados
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Sombra leve
        }}
      >
        <Container component="main" sx={{ maxWidth: "lg" }}>
          <Typography variant="h4" className="text-center mb-4">Lista de Actividades</Typography>
          <Grid container spacing={3}>
            {events.map((event) => {
              const registrationStatus = getRegistrationStatus(event.id);
              return (
                <Grid item xs={12} sm={6} lg={4} key={event.id}>
                  <Card className="hover:shadow-xl">
                    <CardContent>
                      <Typography variant="h5" className="mb-2">{event.name}</Typography>
                      <Typography className="mb-2"><strong>Descripción:</strong> {event.description}</Typography>
                      {formatEventDate(event)}
                      <div className="mt-4">
                        <Button
                          onClick={() => handleRegister(event.id)}
                          disabled={registering || registrationStatus !== null}
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          {registering
                            ? <CircularProgress size={24} />
                            : registrationStatus === "aceptado"
                            ? "Anotado"
                            : registrationStatus === "pendiente"
                            ? "Esperando aprobación"
                            : registrationStatus === "rechazado"
                            ? "Rechazado"
                            : "ANOTARME"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Event;
