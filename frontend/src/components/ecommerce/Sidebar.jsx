import React from 'react';

const Sidebar = ({ categories, featuredProducts }) => {
  return (
    <aside className="w-full md:w-1/4 p-4">
      <h2 className="text-lg font-bold mb-4">CATEGORÍAS DE PRODUCTOS</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center">
            <span>{category.name}</span>
            <i className="fas fa-plus"></i>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mt-8 mb-4">FILTRAR POR PRECIO</h2>
      <div className="flex items-center space-x-2">
        <input type="range" min="0" max="700" className="w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">FILTRAR</button>
      </div>
      <h2 className="text-lg font-bold mt-8 mb-4">PRODUCTOS DESTACADOS</h2>
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
              <p className="text-orange-500 font-bold">{product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;