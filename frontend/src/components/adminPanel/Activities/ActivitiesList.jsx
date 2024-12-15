import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

const ActivitiesList = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <p className="text-center">Cargando eventos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <div>
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
                  <span className="font-semibold">Fecha:</span> {new Date(event.startDateTime).toLocaleDateString()} -{' '}
                  {new Date(event.endDateTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivitiesList;
