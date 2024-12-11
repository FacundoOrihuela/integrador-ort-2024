import React from 'react';

const Sidebar = ({ categories, featuredProducts, className }) => {
  return (
    <aside className={`bg-gray-100 p-4 shadow-md fixed top-[5rem] left-0 h-[calc(100vh-5rem)] w-1/4 ${className}`}>
      {/* Categorías */}
      <div>
        <h2 className="text-lg font-bold mb-4">CATEGORÍAS DE PRODUCTOS</h2>
        <ul className="flex flex-col gap-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center text-gray-800 text-lg font-medium hover:text-colors-1"
            >
              <span>{category.name}</span>
              <i className="fas fa-plus"></i>
            </li>
          ))}
        </ul>
      </div>
      {/* Filtro de precio */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">FILTRAR POR PRECIO</h2>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="700"
            className="w-full"
          />
          <button className="bg-colors-1 text-white px-4 py-2 rounded">FILTRAR</button>
        </div>
      </div>
      {/* Productos destacados */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">PRODUCTOS DESTACADOS</h2>
        <ul className="space-y-4">
          {featuredProducts.map((product) => (
            <li key={product.id} className="flex items-center space-x-4">
              <img 
                src={`http://localhost:3001${product.image}`} 
                alt={product.name} 
                className="w-16 h-16 object-cover" 
              />
              <div>
                <p>{product.name}</p>
                <p className="text-colors-1 font-bold">{product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
