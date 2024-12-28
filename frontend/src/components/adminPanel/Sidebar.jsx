import React from "react";

const Sidebar = ({ className, onMouseLeave, onSelect }) => {
  return (
    <aside
      className={`z-[100] rounded-br-[30px] rounded-tr-[0px] bg-gray-100 p-[174px_0px] flex flex-col shadow-md w-1/4 fixed top-0 left-0 h-full transition-transform duration-300 ${className}`}
      onMouseLeave={onMouseLeave}
    >
      <div className={`z-[100] rounded-br-[30px] rounded-tr-[0px] bg-gray-100 p-[174px_0px] flex flex-col shadow-md w-1/4 fixed top-0 left-0 h-full transition-transform duration-300 ${className}`}>
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
