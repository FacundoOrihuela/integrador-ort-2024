import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";

const GroupPanel = ({ group }) => {
  const [participants, setParticipants] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!group || !token) return;

      try {
        const response = await fetch(
          `http://localhost:3001/api/groups/${group.id}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setParticipants(data.data);
        } else {
          console.error(
            "Error al obtener los participantes:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    fetchParticipants();
  }, [group, token]);

  if (!group) {
    return <p>Selecciona un grupo para ver su información.</p>;
  }

  return (
    <div className="flex h-screen">
      <div className="m-4 p-4 rounded flex-grow">
        <div>
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <p className="text-sm text-gray-500">
            {group.description || "Sin descripción disponible"}
          </p>
          <img
            src={group.photo}
            alt={group.name}
            className="mt-4 w-full h-48 object-cover rounded"
          />
        </div>
      </div>

      <div className="bg-gray-100 shadow p-4 rounded-r flex flex-col items-center">
        <h3 className="text-sm font-semibold mb-4">Participantes</h3>
        <div className="flex flex-col gap-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex flex-col items-center">
              <motion.div
                className="relative rounded-full overflow-hidden shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {participant.photo ? (
                  <Avatar
                    src={participant.photo}
                    alt="Profile Photo"
                    className="h-full w-full"
                  />
                ) : (
                  <AccountCircleIcon className="w-full h-full" />
                )}
              </motion.div>

              <p className="text-xs font-bold text-gray-700">
                {participant.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPanel;
