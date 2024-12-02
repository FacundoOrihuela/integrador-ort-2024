import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import Header from "./Header";
import Sidebar from "./Sidebar";

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.product);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div style={{ justifyContent: "center", alignItems: "center", padding: "150px" }} className="product-list">
            {items.map((product) => (
                <div key={product.id} className="product-item">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
             
            </div>
            <Header />
            <Sidebar />  
        </div>
        
    );
};

export default ProductList;