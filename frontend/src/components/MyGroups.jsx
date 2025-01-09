import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";

const MyGroups = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `http://localhost:3001/api/groups/user/${user.id}/groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setGroups(data.data);
        } else {
          console.error("Error al obtener los grupos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    fetchGroups();
  }, [user, token]);

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex flex-col gap-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <motion.div
              key={group.id}
              className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => onGroupSelect(group)}
            >
              <img
                src={group.photo}
                alt={group.name}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0"
                whileHover={{ opacity: 1 }}
              >
                <p className="text-white text-sm font-bold">{group.name}</p>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p>No estás en ningún grupo aún.</p>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
