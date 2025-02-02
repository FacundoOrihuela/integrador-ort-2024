import React, { useEffect, useState, useCallback } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, Button, TextField, Pagination, IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateGroups from "./CreateGroups";
import config from "../../../utils/config.json";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
    image: null,
  });
  const [page, setPage] = useState(1);
  const groupsPerPage = 8;

  const fetchLeader = async (id) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al conseguir el líder");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError("Error al conectar con el servidor.");
      return null;
    }
  };

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.apiUrl}/api/groups`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los grupos");
      }

      const data = await response.json();
      const groupsWithLeaders = await Promise.all(
        data.data.map(async (group) => {
          const leader = await fetchLeader(group.userId);
          return { ...group, leader };
        })
      );

      setGroups(groupsWithLeaders);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/groups/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setGroups(groups.filter((group) => group.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar el grupo");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (group) => {
    setEditData(group);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchGroups();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredGroups = groups.filter((group) => {
    return group.name.toLowerCase().includes(search.toLowerCase());
  });

  const paginatedGroups = filteredGroups.slice((page - 1) * groupsPerPage, page * groupsPerPage);

  // Mostrar un mensaje si ocurre un error
  if (error) {
    return (
      <Paper className="p-4 m-4">
        <Box className="flex items-center">
          <ErrorIcon className="mr-2" /> Error: {error}
        </Box>
      </Paper>
    );
  }

  // Mostrar un mensaje mientras se cargan los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
        <Box className="ml-2">Cargando grupos...</Box>
      </div>
    );
  }

  return (
    <Paper className="p-4 m-4">
      <Box className="flex justify-between mb-4">
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Box className="flex justify-center mb-4 gap-2">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={toggleCreateModal}
          className="w-[100%]"
        >
          Crear Grupo
        </Button>
      </Box>
      <List>
        {paginatedGroups.map((group) => {
          return (
            <ListItem key={group.id} className="mb-2 bg-gray-100 rounded-lg shadow-md">
              <ListItemAvatar>
                {group.photo ? (
                  <Avatar src={group.photo} />
                ) : (
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box component="span" className="flex items-center">
                    {group.name}
                  </Box>
                }
                secondary={
                  <>
                    <Box component="span" className="flex items-center">
                      Descripción: {group.description}
                    </Box>
                    <Box component="span" className="flex items-center">
                      Líder: {group.leader ? group.leader.user.name : "Sin líder"}
                    </Box>
                  </>
                }
              />
              <Box display="flex" gap={1}>
                <IconButton onClick={() => openEditModal(group)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(group.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          );
        })}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredGroups.length / groupsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleCreateModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateGroups handleUpdateOrCreate={handleUpdateOrCreate} setIsModalOpen={setIsCreateModalOpen} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={toggleEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateGroups
              editData={editData}
              setEditData={setEditData}
              setIsModalOpen={setIsEditModalOpen}
              isUpdate={true}
              handleUpdateOrCreate={handleUpdateOrCreate}
            />
          </div>
        </div>
      )}
    </Paper>
  );
};

export default GroupsList;
