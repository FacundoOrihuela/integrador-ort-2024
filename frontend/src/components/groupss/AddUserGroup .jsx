import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add"; // Icono para añadir
import {
  Avatar,
  Modal,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import config from "../../utils/config.json";

const AddUserGroup = ({ group, onClose }) => {

  console.log("group:", group);
  const [participants, setParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // Ahora guardamos los usuarios completos
  const [openModal, setOpenModal] = useState(true); // Modal abierto por defecto
  const token = localStorage.getItem("token");

  const loadInfoAsync = async () => {
    await fetchParticipants();
    await fetchAllUsers();
  };

  useEffect(() => {
    loadInfoAsync();
  }, [group, token]);

  const fetchAllUsers = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${config.apiUrl}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.users);
        const filteredUsers = data.users.filter(
          (user) => user.userType !== "administrator"
        );
        setAllUsers(filteredUsers);
      } else {
        console.error("Error al obtener todos los usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const fetchParticipants = async () => {
    if (!group || !token) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/api/groups/${group.id}/users`,
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
        console.error("Error al obtener los participantes:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleAddParticipants = async () => {
    if (selectedUsers.length === 0) return;

    try {
      for (const selectedUser of selectedUsers) {
        const response = await fetch(
          `${config.apiUrl}/api/groups/add-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              groupId: group.id,
              userId: selectedUser.id,
            }),
          }
        );

        if (response.ok) {
          console.log(`Usuario ${selectedUser.name} agregado al grupo.`);
        } else {
          console.error("Error al agregar usuario:", response.statusText);
        }
      }

      setOpenModal(false);
      setSelectedUsers([]);
      fetchParticipants();
    } catch (error) {
      console.error("Error al agregar participantes:", error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedIds = event.target.value;
    const selectedUsersList = allUsers.filter(
      (user) =>
        selectedIds.includes(user.id) &&
        !selectedUsers.some((u) => u.id === user.id)
    );
    setSelectedUsers([...selectedUsers, ...selectedUsersList]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

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
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center space-x-2 border border-black rounded-md py-2 px-4 mb-4 w-full justify-center"
        >
          <p className="text-sm font-semibold">Añadir participante</p>
          <AddIcon />
        </button>

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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Selecciona los participantes
            </h3>
            <FormControl fullWidth>
              <InputLabel id="select-participants-label">
                {allUsers.filter(
                  (user) => !participants.some((p) => p.id === user.id)
                ).length > 0
                  ? "Participantes"
                  : "No hay usuarios para seleccionar"}
              </InputLabel>
              <Select
                labelId="select-participants-label"
                multiple
                value={selectedUsers.map((user) => user.id)}
                onChange={handleSelectChange}
                disabled={allUsers.filter(
                  (user) => !participants.some((p) => p.id === user.id)
                ).length === 0}
              >
                {allUsers.filter(
                  (user) =>
                    !participants.some(
                      (participant) => participant.id === user.id
                    )
                ).length > 0 ? (
                  allUsers
                    .filter(
                      (user) =>
                        !participants.some(
                          (participant) => participant.id === user.id
                        )
                    )
                    .map((user) => (
                      <MenuItem
                        key={user.id}
                        value={user.id}
                        disabled={selectedUsers.some((u) => u.id === user.id)}
                      >
                        {user.name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>No hay usuarios para seleccionar</MenuItem>
                )}
              </Select>
            </FormControl>
            <div className="mt-4">
              <h4 className="font-semibold text-lg">Usuarios seleccionados</h4>
              <ul
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {selectedUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between border border-gray-300 p-2 rounded-md shadow-sm"
                  >
                    <span>{user.name}</span>
                    <Button
                      onClick={() => handleRemoveUser(user.id)}
                      color="primary"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-between">
              <Button onClick={() => onClose()} color="error">
                Cancelar
              </Button>
              <Button onClick={handleAddParticipants} color="success">
                Agregar participantes
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserGroup;
