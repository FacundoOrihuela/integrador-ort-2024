import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ProductList = ({ products, className }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <main className={`w-full md:w-3/4 p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <span>Sort By:</span>
        <select className="border border-gray-300 p-2 rounded">
          <option>Ordenar por precio</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-300 p-4 rounded">
            <img 
              src={`http://localhost:3001${product.image}`} 
              alt={product.name} 
              className="w-full h-48 object-cover mb-4" 
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-orange-500 font-bold">{product.price}</p>
            <button 
              onClick={() => addToCart(product)} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductList;