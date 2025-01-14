import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, Button, TextField, Pagination, IconButton } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SortIcon from "@mui/icons-material/Sort";
import CreateNews from "./CreateNews";

const AdminNewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    content: "",
    photo: "",
  });
  const [page, setPage] = useState(1);
  const newsPerPage = 8;

  const fetchNews = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las noticias");
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/news/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setNews(news.filter((item) => item.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar la noticia");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (item) => {
    setEditData(item);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    fetchNews();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPage(1);
  };

  const filteredNews = news.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const sortedNews = filteredNews.sort((a, b) => {
    if (sort === "dateAsc") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "dateDesc") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const paginatedNews = sortedNews.slice((page - 1) * newsPerPage, page * newsPerPage);

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
        <Box className="ml-2">Cargando noticias...</Box>
      </div>
    );
  }

  return (
    <Paper className="p-4 m-4">
      <Box className="flex justify-between mb-4">
        <TextField
          label="Buscar por título"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={toggleCreateModal}>
          Crear Noticia
        </Button>
      </Box>
      <Box className="flex gap-2 mb-4">
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
        {paginatedNews.map((item) => (
          <ListItem key={item.id} className="mb-2 bg-gray-100 rounded-lg shadow-md">
            <ListItemAvatar>
              <Avatar>
                <ArticleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span" className="flex items-center">
                  {item.title}
                </Box>
              }
              secondary={
                <>
                  <Box component="span" className="flex items-center">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Box>
                  <Box component="span" className="flex items-center">
                    {item.content}
                  </Box>
                </>
              }
            />
            <Box display="flex" gap={1}>
              <IconButton onClick={() => openEditModal(item)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(sortedNews.length / newsPerPage)}
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
            <CreateNews handleUpdateOrCreate={handleUpdateOrCreate} setIsModalOpen={setIsCreateModalOpen} />
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
            <CreateNews
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

export default AdminNewsList;