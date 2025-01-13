import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Box, TextField, Pagination, IconButton, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ErrorIcon from '@mui/icons-material/Error';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateActivity from "./CreateActivity";
import ActivityDetails from "./ActivityDetails";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [page, setPage] = useState(1);
  const activitiesPerPage = 8;

  const fetchActivities = () => {
    fetch("http://localhost:3001/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las actividades.");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setActivities(activities.filter((activity) => activity.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al eliminar la actividad.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  const openEditModal = (activity) => {
    setEditData(activity);
    setIsEditModalOpen(true);
  };

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleUpdateOrCreate = () => {
    fetchActivities();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "" || activity.eventType === filterType;
    return matchesSearch && matchesFilter;
  });

  const paginatedActivities = filteredActivities.slice((page - 1) * activitiesPerPage, page * activitiesPerPage);

  const formatEventDate = (event) => {
    if (event.eventType === "single") {
      return (
        <div>
          <h2 className="font-bold">Desde:</h2>
          <p>
            {new Date(event.SingleEvent.startDateTime).toLocaleDateString()}
            <span className="font-bold"> - </span>
            {new Date(event.SingleEvent.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <h2 className="font-bold">Hasta:</h2>
          <p>
            {new Date(event.SingleEvent.endDateTime).toLocaleDateString()}
            <span className="font-bold"> - </span>
            {new Date(event.SingleEvent.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      );
    } else if (event.eventType === "recurring" && event.RecurringEvent.recurrencePattern) {
      return (
        <div>
          <h2 className="font-bold">Frecuencia:</h2>
          <p>
            {event.RecurringEvent.recurrencePattern.days.join(", ")}{" "}
            de {event.RecurringEvent.recurrencePattern.startTime} a {event.RecurringEvent.recurrencePattern.endTime}
          </p>
        </div>
      );
    }
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
        <Box className="ml-2">Cargando actividades...</Box>
      </div>
    );
  }

  return (
    <Paper className="p-4 m-4">
      <Box className="flex justify-between mb-4">
        <TextField
          label="Buscar por nombre de actividad"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: 2 }}>
          <InputLabel id="filter-type-label">Tipo de Actividad</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={handleFilterTypeChange}
            label="Tipo de Actividad"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="single">Único</MenuItem>
            <MenuItem value="recurring">Recurrente</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={toggleCreateModal}>
          Crear Actividad
        </Button>
      </Box>
      <List>
        {paginatedActivities.map((activity) => (
          <ListItem 
            key={activity.id} 
            className="mb-2 bg-gray-100 rounded-lg shadow-md" 
            onClick={() => setSelectedActivity(activity)} 
            sx={{
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                borderWidth: '2px',
                borderStyle: 'solid',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <EventIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span" className="flex items-center">
                  {activity.name}
                </Box>
              }
              secondary={
                <>
                  <Box component="span" className="flex items-center">
                    Descripción: {activity.description}
                  </Box>
                  {formatEventDate(activity)}
                </>
              }
            />
            <Box display="flex" gap={1}>
              <IconButton onClick={(e) => { e.stopPropagation(); openEditModal(activity); }}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDelete(activity.id); }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredActivities.length / activitiesPerPage)}
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
            <CreateActivity handleUpdateOrCreate={handleUpdateOrCreate} />
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
            <CreateActivity
              editData={editData}
              isUpdate
              handleUpdateOrCreate={handleUpdateOrCreate}
            />
          </div>
        </div>
      )}

      {selectedActivity && (
        <ActivityDetails
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </Paper>
  );
};

export default ActivitiesList;
