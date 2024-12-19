import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { UserContext } from '../../context/UserContext';

const Event = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events');
        if (!response.ok) {
          throw new Error('Error al obtener los eventos');
        }
        const data = await response.json();
        console.log(data)
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
      alert('Por favor, inicia sesión para registrarte en un evento.');
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch('http://localhost:3001/api/event-registrations/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          eventId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el evento');
      }

      alert('Te has registrado exitosamente en el evento.');
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al intentar registrarte. Intenta de nuevo.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando eventos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Header />
      <div className="event-container">
        <h2 className="event-title text-center text-3xl font-bold mb-4">ACTIVIDADES</h2>

        {events.length === 0 ? (
          <p className="text-center">No hay eventos disponibles.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card bg-white shadow-lg rounded-lg p-4 mb-4">
              <div className="event-info">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="mb-2 text-gray-700">{event.description}</p>
                <p className="mb-2 text-gray-500">
                <h2 className="font-bold">Empieza:</h2>
                <p>
                  {new Date(event.SingleEvent.startDateTime).toLocaleDateString()}
                  <span className="font-bold"> - </span>
                  {new Date(event.SingleEvent.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <h2 className="font-bold">Finaliza:</h2>
                <p>
                  {new Date(event.SingleEvent.endDateTime).toLocaleDateString()}
                  <span className="font-bold"> - </span>
                  {new Date(event.SingleEvent.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                </p>
                <button 
                  onClick={() => handleRegister(event.id)}
                  disabled={registering}
                  className="event-link bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  {registering ? 'Registrando...' : 'ANOTARME'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Event;
