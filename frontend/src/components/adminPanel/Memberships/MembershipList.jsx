import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, Button, TextField, Pagination, IconButton } from "@mui/material";
import MembershipIcon from "@mui/icons-material/CardMembership";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateMemberships from "./CreateMemberships";
import config from "../../../utils/config.json";

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [page, setPage] = useState(1);
  const membershipsPerPage = 8;

  const fetchMemberships = () => {
    setLoading(true);
    fetch(`${config.apiUrl}/api/memberships`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al obtener las membresías");
        }
        return respuesta.json();
      })
      .then((dataMembresias) => {
        setMemberships(dataMembresias.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/memberships/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMemberships(memberships.filter((membresia) => membresia.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar la membresía");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (membresia) => {
    setEditData(membresia);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchMemberships();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPage(1);
  };

  const filteredMemberships = memberships.filter((membership) => {
    return membership.name.toLowerCase().includes(search.toLowerCase());
  });

  const sortedMemberships = filteredMemberships.sort((a, b) => {
    if (sort === "durationAsc") return a.duration - b.duration;
    if (sort === "durationDesc") return b.duration - a.duration;
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    return 0;
  });

  const paginatedMemberships = sortedMemberships.slice((page - 1) * membershipsPerPage, page * membershipsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
        <Box className="ml-2">Cargando membresías...</Box>
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
          Crear Membresía
        </Button>
      </Box>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:flex justify-center gap-2 mb-4">
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("durationAsc")}
          sx={{
            backgroundColor: sort === "durationAsc" ? "primary.main" : "inherit",
            color: sort === "durationAsc" ? "white" : "primary.main",
            "&:hover": sort === "durationAsc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Duración Asc
        </Button>
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("durationDesc")}
          sx={{
            backgroundColor: sort === "durationDesc" ? "primary.main" : "inherit",
            color: sort === "durationDesc" ? "white" : "primary.main",
            "&:hover": sort === "durationDesc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Duración Desc
        </Button>
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("priceAsc")}
          sx={{
            backgroundColor: sort === "priceAsc" ? "primary.main" : "inherit",
            color: sort === "priceAsc" ? "white" : "primary.main",
            "&:hover": sort === "priceAsc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Precio Asc
        </Button>
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("priceDesc")}
          sx={{
            backgroundColor: sort === "priceDesc" ? "primary.main" : "inherit",
            color: sort === "priceDesc" ? "white" : "primary.main",
            "&:hover": sort === "priceDesc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Precio Desc
        </Button>
      </Box>
      <List>
        {paginatedMemberships.map((membership) => (
          <ListItem key={membership.id} className="mb-2 bg-gray-100 rounded-lg shadow-md">
            <ListItemAvatar>
              <Avatar>
                <MembershipIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span" className="flex items-center">
                  {membership.name}
                </Box>
              }
              secondary={
                <>
                  <Box component="span" className="flex items-center">
                    Descripción: {membership.description}
                  </Box>
                  <Box component="span" className="flex items-center">
                    Precio: ${membership.price}
                  </Box>
                  <Box component="span" className="flex items-center">
                    Duración: {membership.duration} días
                  </Box>
                </>
              }
            />
            <Box display="flex" gap={1}>
              <IconButton onClick={() => openEditModal(membership)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(membership.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(sortedMemberships.length / membershipsPerPage)}
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
            <CreateMemberships handleUpdateOrCreate={handleUpdateOrCreate} setIsModalOpen={setIsCreateModalOpen} />
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
            <CreateMemberships
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

export default MembershipList;
