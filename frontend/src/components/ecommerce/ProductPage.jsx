import React, { useState, useEffect, useContext } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import Memberships from "./Memberships";
import { CartProvider } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { Container, Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../utils/config.json";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMemberships, setShowMemberships] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [tempPriceRange, setTempPriceRange] = useState([0, 0]);
  const [ratingsLoaded, setRatingsLoaded] = useState(false);
  const fixedMinPrice = 0;
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch categories from the API
    fetch(`${config.apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch products from the API
    fetch(`${config.apiUrl}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        // Set initial price range
        const prices = data.data.map((product) => product.price);
        const maxProductPrice = Math.max(...prices);
        setPriceRange([fixedMinPrice, maxProductPrice]);
        setTempPriceRange([fixedMinPrice, maxProductPrice]);
        setMaxPrice(maxProductPrice);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch top-selling products from the API
    fetch(`${config.apiUrl}/api/products/top-selling`)
      .then((response) => response.json())
      .then((data) => setFeaturedProducts(data.data))
      .catch((error) =>
        console.error("Error fetching top-selling products:", error)
      );
  }, []);

  useEffect(() => {
    // Fetch average ratings and rating counts for each product
    const fetchRatings = async () => {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          try {
            const response = await axios.get(
              `${config.apiUrl}/api/ratings/product/${product.id}/average`
            );
            return {
              ...product,
              averageRating: response.data.averageRating,
              ratingCount: response.data.ratingCount,
            };
          } catch (error) {
            console.error(
              `Error fetching ratings for product ${product.id}:`,
              error
            );
            return { ...product, averageRating: 0, ratingCount: 0 };
          }
        })
      );
      setProducts(updatedProducts);
      setRatingsLoaded(true); // Marcar las calificaciones como cargadas
    };

    if (products.length > 0 && !ratingsLoaded) {
      fetchRatings();
    }
  }, [products, ratingsLoaded]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleTempPriceChange = (event, newValue) => {
    setTempPriceRange(newValue);
  };

  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange);
  };

  const handleShowMemberships = () => {
    if (user && user.userType === "client") {
      setShowMemberships(true);
    } else {
      toast.error("Solo los clientes pueden comprar una membresía");
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedCategory || product.categoryId === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  return (
    <CartProvider>
      <div>
        <Header store />
        <Box className="flex flex-col">
          {!showMemberships && (
            <Box
              className="bg-colors-1 text-white text-center py-8 cursor-pointer flex items-center justify-center md:w-3/4 md:ml-[25%]"
              onClick={handleShowMemberships}
            >
              <h2 className="text-4xl font-bold">
                ¡Hacete miembro y disfruta de beneficios, clickea aquí para ver
                mas detalles!
              </h2>
            </Box>
          )}
          <Box className="flex">
            {!showMemberships && (
              <Sidebar
                categories={categories}
                featuredProducts={featuredProducts}
                onCategoryClick={handleCategoryClick}
                priceRange={tempPriceRange}
                onPriceChange={handleTempPriceChange}
                applyPriceFilter={applyPriceFilter}
                className="w-1/4"
                fixedMinPrice={fixedMinPrice}
                maxPrice={maxPrice}
              />
            )}
            <Box
              className={`flex flex-col ${
                showMemberships ? "w-full" : "md:w-3/4 md:ml-[25%]"
              }`}
            >
              {showMemberships ? (
                <Container className="px-4 py-8">
                  <Memberships />
                  <Button
                    onClick={() => setShowMemberships(false)}
                    className="bg-colors-1 text-white px-4 py-2 rounded mt-4"
                  >
                    Volver a la tienda
                  </Button>
                </Container>
              ) : (
                <ProductList products={filteredProducts} className="w-full" />
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </CartProvider>
  );
};

export default ProductPage;
