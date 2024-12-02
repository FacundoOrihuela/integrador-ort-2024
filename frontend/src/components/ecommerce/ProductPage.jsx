import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import Header from "../Header";

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
    <div>
      <Header />
      <div className="container mx-auto p-4 mt-16">
        <div className="flex flex-col md:flex-row">
          <Sidebar
            categories={categories}
            featuredProducts={featuredProducts}
          />
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
