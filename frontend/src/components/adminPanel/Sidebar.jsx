import React from "react";

const Sidebar = ({ onSelect }) => {
  return (
    <aside
      className="z-[100] bg-gray-100 p-4 flex flex-col shadow-md fixed top-0 left-0 h-full"
      style={{ width: '240px', marginTop: '64px' }} // Ancho fijo para el sidebar y margen superior para el header
    >
      <div className="flex flex-col gap-1 mb-8">
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("UserList")}>
          Lista de Usuarios
        </button>
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("Memberships")}>
          Membresías
        </button>
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("Activities")}>
          Actividades
        </button>
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("Groups")}>
          Grupos
        </button>
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("ShoppingList")}>
          Lista de Compras
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
