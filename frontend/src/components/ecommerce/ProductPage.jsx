import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import { CartProvider } from '../../context/CartContext';

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

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
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <CartProvider>
            <div>
                <Header store/>
                <div className="container mx-auto p-4 mt-16 flex">
                    <Sidebar
                        categories={categories}
                        featuredProducts={featuredProducts}
                        className="w-1/4"
                    />
                    <ProductList products={products} className="w-3/4" />
                </div>
            </div>
        </CartProvider>
    );
};

export default ProductPage;
