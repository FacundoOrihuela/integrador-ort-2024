import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import Memberships from './Memberships';
import { CartProvider } from '../../context/CartContext';
import { Container, Button, Box } from '@mui/material';

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showMemberships, setShowMemberships] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [tempPriceRange, setTempPriceRange] = useState([0, 0]);
    const fixedMinPrice = 0;

    useEffect(() => {
        // Fetch categories from the API
        fetch("http://localhost:3001/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data.data))
            .catch((error) => console.error("Error fetching categories:", error));

        // Fetch products from the API
        fetch("http://localhost:3001/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.data);
                // Assuming featured products are the first three products for simplicity
                setFeaturedProducts(data.data.slice(0, 3));
                // Set initial price range
                const prices = data.data.map(product => product.price);
                const maxProductPrice = Math.max(...prices);
                setPriceRange([fixedMinPrice, maxProductPrice]);
                setTempPriceRange([fixedMinPrice, maxProductPrice]);
                setMaxPrice(maxProductPrice);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleTempPriceChange = (event, newValue) => {
        setTempPriceRange(newValue);
    };

    const applyPriceFilter = () => {
        setPriceRange(tempPriceRange);
    };

    const filteredProducts = products.filter(product => {
        return (!selectedCategory || product.categoryId === selectedCategory) &&
               product.price >= priceRange[0] && product.price <= priceRange[1];
    });

    return (
        <CartProvider>
            <div>
                <Header store />
                <Box className="flex flex-col pt-[5rem]">
                    {!showMemberships && (
                        <Box
                            className="bg-colors-1 text-white text-center py-8 cursor-pointer flex items-center justify-center w-3/4 ml-[25%]"
                            onClick={() => setShowMemberships(true)}
                        >
                            <h2 className="text-4xl font-bold">¡Hacete miembro y disfruta de beneficios, clickea aquí para ver mas detalles!</h2>
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
                        <Box className={`flex flex-col ${showMemberships ? 'w-full' : 'w-3/4 ml-[25%]'}`}>
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
