import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,

  Box,
  Tabs,
  Tab,
} from "@mui/material";
import config from "../utils/config.json";

const MyActivities = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
const [registering, setRegistering] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchEvents = useCallback(async () => {
    if (user) {
      try {
        const registrationsResponse = await fetch(
          `${config.apiUrl}/api/event-registrations/user/${user.id}`
        );
        if (!registrationsResponse.ok) {
          throw new Error("Error al obtener los registros de eventos.");
        }
        const registrationsData = await registrationsResponse.json();
        const eventIds = registrationsData.map((reg) => reg.eventId);
  
        const eventsResponse = await fetch(`${config.apiUrl}/api/events`);
        if (!eventsResponse.ok) {
          throw new Error("Error al obtener las actividades.");
        }
        const allEvents = await eventsResponse.json();
  
        const filteredEvents = allEvents.filter((event) => eventIds.includes(event.id));
        setEvents(filteredEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  const fetchRegistrations = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch(
          `${config.apiUrl}/api/event-registrations/user/${user.id}`
        );
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

  // eslint-disable-next-line no-unused-vars
  const handleRegister = async (eventId) => {
    if (!user) {
      toast.error("Por favor, inicia sesión para registrarte en una actividad.");
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch(
        `${config.apiUrl}/api/event-registrations/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            eventId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrarte en la actividad.");
      }

      toast.success("Te has registrado exitosamente en la actividad.");
      fetchRegistrations();
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
    } else if (
      event.eventType === "recurring" &&
      event.RecurringEvent.recurrencePattern
    ) {
      return (
        <div>
          <Typography variant="h6">Frecuencia:</Typography>
          <Typography>
            {event.RecurringEvent.recurrencePattern.days.join(", ")} de{" "}
            {event.RecurringEvent.recurrencePattern.startTime} a{" "}
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

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const filteredEvents = events.filter((event) => {
    if (tabIndex === 0) {
      return event.eventType === "recurring";
    } else {
      const endDateTime = event.SingleEvent?.endDateTime
        ? new Date(event.SingleEvent.endDateTime)
        : null;
      const currentDateTime = new Date();
      return (
        event.eventType === "single" &&
        endDateTime &&
        endDateTime >= currentDateTime
      );
    }
  });

  if (loading) {
    return <Typography className="text-center">Cargando actividades...</Typography>;
  }

  if (error) {
    return (
      <Typography className="text-center text-red-500">Error: {error}</Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "secondary.main",
      }}
    >
      <Header />
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "100%",
          maxWidth: "80%",
          margin: "2rem auto",
          borderRadius: "12px", 
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container component="main" sx={{ maxWidth: "lg" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Clases" />
            <Tab label="Eventos" />
          </Tabs>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {filteredEvents.map((event) => {
              const registrationStatus = getRegistrationStatus(event.id);
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={event.id}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "12px",
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
                      transition: "0.3s",
                      '&:hover': {
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        padding: "1.5rem",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                        {event.name}
                      </Typography>
                      <Typography sx={{ color: "#555", marginBottom: "1rem" }}>
                        <strong>Descripción:</strong> {event.description}
                      </Typography>
                      {formatEventDate(event)}
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          padding: "0.5rem",
                          borderRadius: "8px",
                          backgroundColor: registrationStatus === "aceptado" ? "#4caf50" :
                            registrationStatus === "pendiente" ? "#ff9800" :
                            registrationStatus === "rechazado" ? "#f44336" : "#2196f3",
                          color: "white",
                        }}
                      >
                        {registrationStatus === "aceptado" ? "Anotado" :
                          registrationStatus === "pendiente" ? "Esperando aprobación" :
                          registrationStatus === "rechazado" ? "Rechazado" : "No registrado"}
                      </Typography>
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

export default MyActivities;
