import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
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
import { UserContext } from "../../context/UserContext";
import EditGroup from "./EditGroup"; // Importa el componente EditGroup

const GroupPanel = ({ group }) => {
  const [participants, setParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false); // Estado para controlar el modal de editar grupo
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);

  const loadInfoAsync = async () => {
    await fetchParticipants();
    await fetchAllUsers();
  };

  useEffect(() => {
    loadInfoAsync();
    console.log("grupo:",group)
    console.log("user:",user)
  }, [group, token]);

  const fetchAllUsers = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user) => user.userType !== "administrator"
        );
        setAllUsers(filteredUsers);
      } else {
        console.error(
          "Error al obtener todos los usuarios:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

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

  const handleAddParticipants = async () => {
    if (selectedUsers.length === 0) return;

    try {
      for (const selectedUser of selectedUsers) {
        const response = await fetch(
          `http://localhost:3001/api/groups/add-user`,
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
      setConfigModalOpen(false);
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
        {group && user && group.userId === user.id && <button
          onClick={() => setConfigModalOpen(true)}
          className="flex items-center space-x-2 border border-black rounded-md py-2 px-4 mb-4 w-full justify-center"
        >
          <SettingsIcon />
          <p className="text-sm font-semibold">Configurar grupo</p>
        </button>}

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

      {/* Modal de Configuración del Grupo */}
      <Modal open={configModalOpen} onClose={() => setConfigModalOpen(false)}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={() => setConfigModalOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            <h3 className="text-xl font-semibold mb-4">Configurar grupo</h3>
            <div className="flex flex-col gap-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Añadir participantes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditGroupModalOpen(true)}
              >
                Editar grupo
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal para editar el grupo */}
      <Modal
        open={editGroupModalOpen}
        onClose={() => setEditGroupModalOpen(false)}
      >
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={() => setEditGroupModalOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            <EditGroup
              editData={group}
              isUpdate={true}
              handleUpdateOrCreate={() => {
                fetchParticipants();
                setEditGroupModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>

      {/* Modal de Añadir Participantes */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />

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
                disabled={false}
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
                    className="flex justify-between items-center"
                  >
                    <span>{user.name}</span>
                    <DeleteIcon
                      className="cursor-pointer text-red-500"
                      onClick={() => handleRemoveUser(user.id)}
                    />
                  </li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddParticipants}
                className="mt-4"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GroupPanel;
