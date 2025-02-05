import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Paper,
  CircularProgress,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import Header from "./Header";
import config from "../utils/config.json";

const PurchaseHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const ordersPerPage = 8;

  useEffect(() => {
    if (user) {
      axios
        .get(`${config.apiUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setOrders(response.data.orders);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setError("Error al obtener las órdenes");
          setLoading(false);
        });

      axios
        .get(`${config.apiUrl}/api/ratings/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => setUserRatings(response.data.data))
        .catch((error) => console.error("Error fetching user ratings:", error));
    }
  }, [user]);

  const handleDownload = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleOpenRatingDialog = (product) => {
    setSelectedProduct(product);
    setOpenRatingDialog(true);
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
    setSelectedProduct(null);
    setRating(0);
  };

  const handleRatingSubmit = () => {
    if (selectedProduct && rating > 0) {
      axios
        .post(
          `${config.apiUrl}/api/ratings`,
          {
            userId: user.id,
            productId: selectedProduct.id,
            rating,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          handleCloseRatingDialog();
          setUserRatings([
            ...userRatings,
            { productId: selectedProduct.id, rating },
          ]);
        })
        .catch((error) => console.error("Error submitting rating:", error));
    }
  };

  const hasRatedProduct = (productId) => {
    return userRatings.some((rating) => rating.productId === productId);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleOrderDirectionChange = (event) => {
    setOrderDirection(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      return order.OrderItems.some((item) =>
        item.Product.name.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (orderDirection === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  if (error) {
    return (
      <Paper className="p-4 m-4">
        <Box className="flex items-center">
          <ErrorIcon className="mr-2" /> Error: {error}
        </Box>
      </Paper>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
        <Box className="ml-2">Cargando órdenes...</Box>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
        sx={{ padding: { xs: 2, sm: 4 } }}
      >
        {orders.length === 0 ? (
          <Paper sx={{ padding: 4, textAlign: "center" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              ¡Aún no tienes compras!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Explora nuestra tienda y realiza tu primera orden.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/store"
              sx={{ marginTop: 2 }}
            >
              Ir a la tienda
            </Button>
          </Paper>
        ) : (
          <Paper
            className="p-4 m-4"
            sx={{
              width: { xs: "90vw", sm: "80vw", md: "60vw" },
              minWidth: { xs: "unset", md: "800px" },
            }}
          >
            <Box
              className="flex justify-between mb-4"
              sx={{
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                label="Buscar por nombre de producto"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={{ flex: 2, width: { xs: "100%", md: "auto" } }}
              />
              <Typography
                variant="h6"
                sx={{
                  flex: 1,
                  textAlign: { xs: "left", md: "center" },
                  alignSelf: { xs: "flex-start", md: "center" },
                }}
              >
                Órdenes realizadas: {orders.length}
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  minWidth: 200,
                  flex: 1,
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={orderDirection}
                  onChange={handleOrderDirectionChange}
                  label="Ordenar por"
                >
                  <MenuItem value="desc">Más recientes</MenuItem>
                  <MenuItem value="asc">Más antiguos</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <List>
              {paginatedOrders.map((order) => (
                <Paper
                  key={order.id}
                  className="mb-4 p-4"
                  sx={{
                    borderLeft: `5px solid ${getOrderStatusColor(
                      order.status
                    )}`,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary={`Fecha: ${new Date(
                        order.createdAt
                      ).toLocaleString()}`}
                      secondary={`Total: $${order.totalAmount.toFixed(
                        2
                      )} - Estado: ${order.status}`}
                      className="text-black"
                    />
                  </ListItem>
                  <List component="div" disablePadding>
                    {order.OrderItems.map((item) => {
                      const cloudinaryUrl = new URL(item.Product.image);
                      const relativePath = cloudinaryUrl.pathname;

                      const imgixUrl = `https://tiferet-689097844.imgix.net${relativePath}`;

                      return (
                        <ListItem
                          key={item.id}
                          className="pl-8 flex items-center"
                          sx={{ flexDirection: { xs: "column", sm: "row" } }}
                        >
                          <Avatar
                            src={`${imgixUrl}?w=64&h=64&fit=crop`}
                            alt={item.Product.name}
                            sx={{
                              width: 64,
                              height: 64,
                              marginRight: { sm: 2 },
                              marginBottom: { xs: 1, sm: 0 },
                            }}
                          />
                          <ListItemText
                            primary={`${
                              item.Product.name
                            } - $${item.priceAtPurchase.toFixed(2)}`}
                            secondary={`Cantidad: ${item.quantity}`}
                            className="text-black"
                            sx={{ textAlign: { xs: "center", sm: "left" } }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              marginTop: { xs: 1, sm: 0 },
                              gap: 1,
                            }}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handleOpenRatingDialog(item.Product)
                              }
                              sx={{ width: { xs: "100%", sm: 120 } }}
                              disabled={hasRatedProduct(item.Product.id)}
                              startIcon={<StarIcon />}
                            >
                              {hasRatedProduct(item.Product.id)
                                ? "Calificado"
                                : "Calificar"}
                            </Button>
                            {item.Product.file && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleDownload(item.Product.file)
                                }
                                sx={{
                                  color: "white",
                                  width: { xs: "100%", sm: "auto" },
                                }}
                                startIcon={<DownloadIcon />}
                              >
                                Descargar
                              </Button>
                            )}
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              ))}
            </List>
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(filteredOrders.length / ordersPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Paper>
        )}
      </Box>
      <Dialog
        open={openRatingDialog}
        onClose={handleCloseRatingDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Calificar Producto</DialogTitle>
        <DialogContent>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRatingDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRatingSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PurchaseHistory;
