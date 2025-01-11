import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, Button, TextField, Pagination, IconButton } from "@mui/material";
import ProductIcon from "@mui/icons-material/Store";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateProduct from "./CreateProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar el producto");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (product) => {
    setEditData(product);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchProducts();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });

  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

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
        <Box className="ml-2">Cargando productos...</Box>
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
          Crear Producto
        </Button>
      </Box>
      <List>
        {paginatedProducts.map((product) => (
          <ListItem key={product.id} className="mb-2 bg-gray-100 rounded-lg shadow-md">
            <ListItemAvatar>
              <Avatar>
                <ProductIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span" className="flex items-center">
                  {product.name}
                </Box>
              }
              secondary={
                <>
                  <Box component="span" className="flex items-center">
                    Descripción: {product.description}
                  </Box>
                  <Box component="span" className="flex items-center">
                    Precio: ${product.price}
                  </Box>
                  <Box component="span" className="flex items-center">
                    Stock: {product.stock}
                  </Box>
                </>
              }
            />
            <Box display="flex" gap={1}>
              <IconButton onClick={() => openEditModal(product)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(product.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
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
            <CreateProduct handleUpdateOrCreate={handleUpdateOrCreate} setIsModalOpen={setIsCreateModalOpen} />
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
            <CreateProduct
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

export default ProductList;