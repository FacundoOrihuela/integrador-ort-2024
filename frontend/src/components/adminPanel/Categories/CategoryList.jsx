import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, Button, TextField, Pagination, IconButton } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateCategory from "./CreateCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [page, setPage] = useState(1);
  const categoriesPerPage = 8;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categories");
      setCategories(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error al obtener las categorías");
      toast.error("Error al obtener las categorías");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const productsResponse = await axios.get(`http://localhost:3001/api/products/category/${id}`);
      const productsData = productsResponse.data;

      if (productsData.data.length > 0) {
        toast.error("No se puede eliminar la categoría porque tiene productos asignados.");
        return;
      }

      const response = await axios.delete(`http://localhost:3001/api/categories/${id}`);

      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
        toast.success("Categoría eliminada exitosamente.");
      } else {
        setError(response.data.message || "Error al eliminar la categoría");
        toast.error(response.data.message || "Error al eliminar la categoría");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      toast.error("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (category) => {
    setEditData(category);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchCategories();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredCategories = categories.filter((category) => {
    return category.name.toLowerCase().includes(search.toLowerCase());
  });

  const paginatedCategories = filteredCategories.slice((page - 1) * categoriesPerPage, page * categoriesPerPage);

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
        <Box className="ml-2">Cargando categorías...</Box>
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
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={toggleCreateModal}>
          Crear Categoría
        </Button>
      </Box>
      <List>
        {paginatedCategories.map((category) => (
          <ListItem key={category.id} className="mb-2 bg-gray-100 rounded-lg shadow-md">
            <ListItemAvatar>
              <Avatar>
                <CategoryIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span" className="flex items-center">
                  {category.name}
                </Box>
              }
              secondary={
                <>
                  <Box component="span" className="flex items-center">
                    Descripción: {category.description}
                  </Box>
                </>
              }
            />
            <Box display="flex" gap={1}>
              <IconButton onClick={() => openEditModal(category)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(category.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredCategories.length / categoriesPerPage)}
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
            <CreateCategory handleUpdateOrCreate={handleUpdateOrCreate} setIsModalOpen={setIsCreateModalOpen} />
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
            <CreateCategory
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

export default CategoryList;