import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Header from "../Header";
import Footer from "../Footer";

const Event = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
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
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    if (!user) {
      alert("Por favor, inicia sesión para registrarte en una actividad.");
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

      alert("Te has registrado exitosamente en la actividad.");
    } catch (err) {
      alert("Hubo un problema al intentar registrarte. Intenta de nuevo.");
    } finally {
      setRegistering(false);
    }
  };

  const formatEventDate = (event) => {
    if (event.eventType === "single") {
      return (
        <div>
          <h2 className="font-bold">Desde:</h2>
          <p>
            {new Date(event.SingleEvent.startDateTime).toLocaleDateString()}{" "}
            {new Date(event.SingleEvent.startDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <h2 className="font-bold">Hasta:</h2>
          <p>
            {new Date(event.SingleEvent.endDateTime).toLocaleDateString()}{" "}
            {new Date(event.SingleEvent.endDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    } else if (event.eventType === "recurring" && event.RecurringEvent.recurrencePattern) {
      return (
        <div>
          <h2 className="font-bold">Frecuencia:</h2>
          <p>
            {event.RecurringEvent.recurrencePattern.days.join(", ")}{" "}
            de {event.RecurringEvent.recurrencePattern.startTime} a{" "}
            {event.RecurringEvent.recurrencePattern.endTime}
          </p>
        </div>
      );
    }
  };

  if (loading) {
    return <p className="text-center">Cargando actividades...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Header />
      <main className="flex-grow mt-[5rem] p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Lista de Actividades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-colors-1 mb-2">
                {event.name}
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Descripción:</span> {event.description}
              </p>
              {formatEventDate(event)}
              <div className="mt-4">
                <button
                  onClick={() => handleRegister(event.id)}
                  disabled={registering}
                  className="w-full bg-colors-1 text-white px-3 py-2 rounded hover:bg-colors-3 transition duration-200"
                >
                  {registering ? "Registrando..." : "ANOTARME"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Event;
