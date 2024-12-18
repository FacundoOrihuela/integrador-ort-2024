import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Box, Typography, Select, MenuItem, Grid, Card, CardContent, CardMedia, Button, Rating } from '@mui/material';

const ProductList = ({ products, className }) => {
  const { addToCart } = useContext(CartContext);
  const [sortOption, setSortOption] = useState('price-asc'); // Valor inicial

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <Box className={`w-full p-4 ${className}`}>
      <Box className="flex items-center justify-end mb-4">
        <Typography className="mr-4 text-sm font-medium text-gray-700">Ordenar por:</Typography>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 p-2 rounded text-sm font-medium text-gray-700"
          style={{
            width: '200px',
            height: '36px',
            fontSize: '14px',
            padding: '0 8px',
            margin: '0 10px',
            lineHeight: '1.2',
          }}
          MenuProps={{
            PaperProps: { style: { maxHeight: '200px' } }, // Altura máxima del desplegable
          }}
        >
          <MenuItem value="price-asc">Precio menor a mayor</MenuItem>
          <MenuItem value="price-desc">Precio mayor a menor</MenuItem>
          <MenuItem value="name-asc">Alfabéticamente A-Z</MenuItem>
          <MenuItem value="name-desc">Alfabéticamente Z-A</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        {sortedProducts.map((product) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
            <Card className="bg-white p-4 rounded shadow-md">
              <Box className="w-full h-48 mb-4">
                <CardMedia
                  component="img"
                  image={`http://localhost:3001${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </Box>
              <CardContent className="flex items-center flex-col items-start">
                <Typography variant="h6" className="font-bold">{product.name}</Typography>
                <Typography variant="h5" className="text-colors-1 font-bold">${product.price}</Typography>
                <Box className="flex items-center">
                  <Rating
                    name={`rating-${product.id}`}
                    value={product.averageRating || 5}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#FFD700',
                      },
                      '& .MuiRating-iconEmpty': {
                        color: '#FFD700',
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" className="ml-2">
                    ({product.ratingCount || 0})
                  </Typography>
                </Box>
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-colors-1 text-white px-4 py-2 rounded mt-2"
                >
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
