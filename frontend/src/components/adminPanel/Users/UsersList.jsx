import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, MenuItem, Select, FormControl, InputLabel, Button, Box, TextField, Pagination } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import CreateUser from "./CreateUser";
import SendProduct from "./SendProduct";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSendProductModalOpen, setIsSendProductModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/user/all", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los clientes");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchProducts = () => {
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    fetchUsers();
  };

  const handleSendProduct = (client) => {
    setSelectedClient(client);
    setIsSendProductModalOpen(true);
  };

  const handleSendProductSubmit = () => {
    const productIds = selectedProducts.map((product) => product.id);
    axios.post("http://localhost:3001/api/orders/create", {
      userId: selectedClient.id,
      productIds,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setIsSendProductModalOpen(false);
      setSelectedProducts([]);
      console.log("Productos enviados:", response.data);
    })
    .catch(error => console.error("Error sending products:", error));
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "") return true;
    return user.userType === filter;
  });

  const searchedUsers = filteredUsers.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  const sortedUsers = searchedUsers.sort((a, b) => {
    if (sort === "nameAsc") return a.name.localeCompare(b.name);
    if (sort === "nameDesc") return b.name.localeCompare(a.name);
    if (sort === "dateAsc") return new Date(a.created) - new Date(b.created);
    if (sort === "dateDesc") return new Date(b.created) - new Date(a.created);
    return 0;
  });

  const paginatedUsers = sortedUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

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
        <Box className="ml-2">Cargando clientes...</Box>
      </div>
    );
  }

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case 'client':
        return <GroupIcon className="mr-2" />;
      case 'teacher':
        return <SchoolIcon className="mr-2" />;
      case 'administrator':
        return <AdminPanelSettingsIcon className="mr-2" />;
      default:
        return <AccountCircleIcon className="mr-2" />;
    }
  };

  return (
    <Paper className="p-4 m-4">
      <Box className="flex justify-between mb-4">
        <Box className="flex gap-2 w-3/4">
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" className="w-1/4">
            <InputLabel>Filtrar por tipo</InputLabel>
            <Select value={filter} onChange={handleFilterChange} label="Filtrar por tipo">
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="client">Cliente</MenuItem>
              <MenuItem value="teacher">Profesor</MenuItem>
              <MenuItem value="administrator">Administrador</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateUser}>
          Crear Usuario
        </Button>
      </Box>
      <Box className="flex gap-2 mb-4">
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("nameAsc")}
          sx={{
            backgroundColor: sort === "nameAsc" ? "primary.main" : "inherit",
            color: sort === "nameAsc" ? "white" : "primary.main",
            "&:hover": sort === "nameAsc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Nombre Asc
        </Button>
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("nameDesc")}
          sx={{
            backgroundColor: sort === "nameDesc" ? "primary.main" : "inherit",
            color: sort === "nameDesc" ? "white" : "primary.main",
            "&:hover": sort === "nameDesc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Nombre Desc
        </Button>
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("dateAsc")}
          sx={{
            backgroundColor: sort === "dateAsc" ? "primary.main" : "inherit",
            color: sort === "dateAsc" ? "white" : "primary.main",
            "&:hover": sort === "dateAsc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Fecha Asc
        </Button>
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={() => handleSortChange("dateDesc")}
          sx={{
            backgroundColor: sort === "dateDesc" ? "primary.main" : "inherit",
            color: sort === "dateDesc" ? "white" : "primary.main",
            "&:hover": sort === "dateDesc" ? { backgroundColor: "primary.main" } : {},
          }}
        >
          Fecha Desc
        </Button>
      </Box>
      <List>
        {paginatedUsers.map((user) => (
          <ListItem key={user.id} className="mb-2 bg-gray-100 rounded-lg shadow-md">
            <ListItemAvatar>
              {user.photo ? (
                <Avatar src={user.photo} />
              ) : (
                <Avatar>
                  <PersonIcon />
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span" className="flex items-center">
                  {getUserTypeIcon(user.userType)} {user.name}
                </Box>
              }
              secondary={
                <>
                  <Box component="span" className="flex items-center">
                    <EmailIcon className="mr-2" /> {user.email}
                  </Box>
                  <Box component="span" className="flex items-center">
                    {user.userType === 'client' ? 'Cliente' : user.userType === 'teacher' ? 'Profesor' : 'Administrador'}
                  </Box>
                  <Box component="span" className="flex items-center">
                    Fecha de creación: {new Date(user.created).toLocaleDateString()}
                  </Box>
                </>
              }
            />
            {user.userType === 'client' && (
              <Button variant="contained" color="secondary" onClick={() => handleSendProduct(user)}>
                Enviar Producto
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(sortedUsers.length / usersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000]">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <CreateUser handleUpdateOrCreate={handleUpdateOrCreate} setIsModalOpen={setIsCreateModalOpen} />
          </div>
        </div>
      )}

      {isSendProductModalOpen && (
        <SendProduct
          client={selectedClient}
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          handleSendProductSubmit={handleSendProductSubmit}
          setIsModalOpen={setIsSendProductModalOpen}
        />
      )}
    </Paper>
  );
};

export default UserList;
