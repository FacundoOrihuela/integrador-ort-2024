import React from 'react';
import { Box, Typography, Slider, List, ListItem, ListItemText, Avatar, Button, Grid } from '@mui/material';

const Sidebar = ({ categories, featuredProducts, onCategoryClick, priceRange, onPriceChange, applyPriceFilter, className, fixedMinPrice, maxPrice }) => {
  return (
    <Box className={`bg-gray-100 p-4 shadow-md fixed top-[5rem] left-0 h-[calc(100vh-5rem)] w-1/4 ${className}`}>
      {/* Categorías */}
      <Box>
        <Typography variant="h6" className="font-bold mb-4">CATEGORÍAS DE PRODUCTOS</Typography>
        <List className="flex flex-col gap-4">
          <ListItem button onClick={() => onCategoryClick(null)}>
            <ListItemText primary="Todas las categorías" className="text-gray-800 text-lg font-medium hover:text-colors-1" />
          </ListItem>
          {categories.map((category) => (
            <ListItem button key={category.id} onClick={() => onCategoryClick(category.id)}>
              <ListItemText primary={category.name} className="text-gray-800 text-lg font-medium hover:text-colors-1" />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Filtro de precio */}
      <Box className="mt-8">
        <Typography variant="h6" className="font-bold mb-4">FILTRAR POR PRECIO</Typography>
        <Box className="flex items-center space-x-8">
          <Typography>${fixedMinPrice}</Typography>
          <Slider
            value={priceRange}
            min={fixedMinPrice}
            max={maxPrice}
            step={5}
            onChange={onPriceChange}
            valueLabelDisplay="auto"
            className="w-full"
          />
          <Typography>${maxPrice}</Typography>
        </Box>
        <Box className="flex items-center justify-between mt-4">
          <Typography className="mb-2">Rango actual: ${priceRange[0]} - ${priceRange[1]}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={applyPriceFilter}
          >
            Aplicar Filtro
          </Button>
        </Box>
      </Box>
      {/* Productos destacados */}
      <Box className="mt-8">
        <Typography variant="h6" className="font-bold" sx={{ mb: 2 }}>PRODUCTOS DESTACADOS</Typography>
        <Grid container spacing={2}>
          {featuredProducts.map((product) => (
            <Grid item xs={6} key={product.id}>
              <Box display="flex" alignItems="center" p={1} border={1} borderColor="grey.300" borderRadius={2}>
                <Avatar
                  src={`http://localhost:3001${product.image}`}
                  alt={product.name}
                  sx={{ width: 64, height: 64 }}
                />
                <Box flexGrow={1} ml={2}>
                  <Typography variant="body2" fontWeight="bold">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{product.timesSold} vendidos</Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">${product.price}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Sidebar;
