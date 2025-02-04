import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Sidebar = ({
  categories,
  featuredProducts,
  onCategoryClick,
  priceRange,
  onPriceChange,
  applyPriceFilter,
  className,
  fixedMinPrice,
  maxPrice,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        className={`bg-white p-6 shadow-lg fixed top-[56px] left-0 w-1/4 overflow-y-auto hidden md:block ${className}`}
        sx={{
          height: "calc(100vh - 56px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f0f0f0" },
        }}
      >
        <SidebarContent
          categories={categories}
          featuredProducts={featuredProducts}
          onCategoryClick={onCategoryClick}
          priceRange={priceRange}
          onPriceChange={onPriceChange}
          applyPriceFilter={applyPriceFilter}
          fixedMinPrice={fixedMinPrice}
          maxPrice={maxPrice}
        />
      </Box>
      <Box
        className={`fixed top-[56px] left-0 w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
        sx={{
          maxHeight: "calc(100vh - 56px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f0f0f0" },
        }}
      >
        <SidebarContent
          categories={categories}
          featuredProducts={featuredProducts}
          onCategoryClick={onCategoryClick}
          priceRange={priceRange}
          onPriceChange={onPriceChange}
          applyPriceFilter={applyPriceFilter}
          fixedMinPrice={fixedMinPrice}
          maxPrice={maxPrice}
        />
      </Box>

      <button
        onClick={() => setOpen(!open)}
        className={`md:hidden fixed top-[100px] ${
          open ? "left-[256px]" : "left-0"
        } bg-gray-300 text-black border border-black py-2 rounded-r-md z-10 flex items-center justify-center transition-all duration-300`}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </>
  );
};

const SidebarContent = ({
  categories,
  featuredProducts,
  onCategoryClick,
  priceRange,
  onPriceChange,
  applyPriceFilter,
  fixedMinPrice,
  maxPrice,
}) => (
  <>
    <Box>
      <Typography variant="h6" className="font-bold text-gray-700 mb-4">
        Categorías
      </Typography>
      <List className="flex flex-col gap-3">
        <ListItem
          button
          onClick={() => onCategoryClick(null)}
          className="hover:bg-gray-200 rounded-lg transition"
        >
          <ListItemText
            primary="Todas las categorías"
            className="text-gray-800 text-lg font-medium"
          />
        </ListItem>
        {categories.map((category) => (
          <ListItem
            button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="hover:bg-gray-200 rounded-lg transition"
          >
            <ListItemText
              primary={category.name}
              className="text-gray-800 text-lg font-medium"
            />
          </ListItem>
        ))}
      </List>
    </Box>

    <Box className="mt-8">
      <Typography variant="h6" className="font-bold text-gray-700 mb-4">
        Filtrar por Precio
      </Typography>
      <Box className="flex items-center gap-4">
        <Typography className="text-gray-600 font-semibold">
          ${fixedMinPrice}
        </Typography>
        <Slider
          value={priceRange}
          min={fixedMinPrice}
          max={maxPrice}
          step={5}
          onChange={onPriceChange}
          valueLabelDisplay="auto"
          className="w-full"
        />
        <Typography className="text-gray-600 font-semibold">
          ${maxPrice}
        </Typography>
      </Box>
      <Typography className="text-gray-600 text-sm mt-2">
        Rango: ${priceRange[0]} - ${priceRange[1]}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={applyPriceFilter}
        fullWidth
        className="mt-4 rounded-lg"
      >
        Aplicar Filtro
      </Button>
    </Box>

    {/* Productos destacados */}
    <Box className="mt-8">
      <Typography variant="h6" className="font-bold text-gray-700 mb-4">
        Productos Destacados
      </Typography>
      <Grid container spacing={2}>
        {featuredProducts.map((product) => {
          const cloudinaryUrl = new URL(product.image);
          const relativePath = cloudinaryUrl.pathname;
          const imgixUrl = `https://tiferet-689097844.imgix.net${relativePath}`;

          return (
            <Grid item xs={12} key={product.id}>
              <Box className="flex items-center p-3 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
                <Avatar
                  src={`${imgixUrl}?w=64&h=64&fit=crop`}
                  alt={product.name}
                  sx={{ width: 64, height: 64 }}
                />
                <Box className="ml-4 flex-grow">
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    className="text-gray-800"
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {product.timesSold} vendidos
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-primary"
                >
                  ${product.price}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  </>
);

export default Sidebar;
