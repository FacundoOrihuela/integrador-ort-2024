import React from 'react';

const Sidebar = ({ categories, featuredProducts, className }) => {
  return (
    <aside className={`h-[calc(100vh-60px)] bg-gray-100 p-[70px_20px] flex flex-col shadow-md z-50 ${className}`}>
      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-xl font-bold text-gray-800">Sidebar Logo</h1>
        <p className="text-sm text-gray-500">example@email.com</p>
      </div>
      {/* Categorías */}
      <div>
        <h2 className="text-lg font-bold mb-4">CATEGORÍAS DE PRODUCTOS</h2>
        <ul className="flex flex-col gap-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center text-gray-800 text-lg font-medium hover:text-blue-500"
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded">FILTRAR</button>
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
