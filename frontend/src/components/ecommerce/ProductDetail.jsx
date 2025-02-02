import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FavoriteContext } from "../../context/FavoriteContext";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Rating,
  Container,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import config from "../../utils/config.json";
import RegisterAlert from "../RegisterAlert";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { favorite, addToFavorite, removeFromFavorite } =
    useContext(FavoriteContext);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useContext(UserContext);

  const handleRestrictedFavorite = (product) => {
    if (!user) {
      setShowAlert(true);
    } else {
      isFavorite(product.id)
        ? removeFromFavorite(product.id)
        : addToFavorite(product);
    }
  };

  const handleRestrictedCart = (product) => {
    if (!user) {
      setShowAlert(true);
    } else {
      addToCart(product);
    }
  };

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/products/${id}`)
      .then((response) => {
        setProduct(response.data.data);
        return axios.get(
          `${config.apiUrl}/api/categories/${response.data.data.categoryId}`
        );
      })
      .then((response) => setCategory(response.data.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const isFavorite = (productId) => {
    return favorite.some((item) => item.productId === productId);
  };

  if (!product || !category) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header store />
      <Container
        className="container mx-auto p-4 mt-[5rem]"
        style={{ flex: "1" }}
      >
        <Box className="bg-white p-6 rounded shadow-md">
          <Box className="flex flex-col items-center">
            <Avatar
              src={product.image}
              alt={product.name}
              sx={{
                width: 300,
                height: 300,
                marginBottom: 2,
                borderRadius: "8px",
              }}
              variant="square"
            />
            <Typography variant="h4" className="font-bold mb-2">
              {product.name}
            </Typography>
            <Typography variant="h5" className="text-colors-1 font-bold mb-2">
              ${product.price}
            </Typography>
            <Typography variant="body1" className="mb-4">
              {product.description}
            </Typography>
            <Typography variant="body2" className="mb-4">
              Stock: {product.stock}
            </Typography>
            <Typography variant="body2" className="mb-4">
              Categoría: {category.name}
            </Typography>
            <Box className="flex items-center mb-4">
              <Rating
                name={`rating-${product.id}`}
                value={product.averageRating || 5}
                precision={0.1}
                readOnly
                size="large"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#FFD700",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#FFD700",
                  },
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                className="ml-2"
              >
                ({product.ratingCount || 0})
              </Typography>
            </Box>
            <Button
              onClick={() => handleRestrictedCart(product)}
              className="bg-colors-1 text-white px-4 py-2 rounded mb-2"
            >
              Agregar al carrito
            </Button>
            <Button
              onClick={() => handleRestrictedFavorite(product)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              {isFavorite(product.id)
                ? "Eliminar de Favoritos"
                : "Agregar a Favoritos"}
            </Button>
          </Box>
        </Box>
        {showAlert && (
          <RegisterAlert open={showAlert} onClose={() => setShowAlert(false)} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default ProductDetail;
