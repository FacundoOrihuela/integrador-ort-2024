import React from 'react';

const Sidebar = ({ className, onMouseLeave, onSelect }) => {
  return (
    <aside className={`bg-gray-100 p-[174px_0px] flex flex-col shadow-md w-1/4 fixed top-0 left-0 h-full transition-transform duration-300 ${className}`} onMouseLeave={onMouseLeave}>
      <div className="flex flex-col gap-1 mb-8">
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("UserList")}>
          Lista de Usuarios
        </button>
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("CreateMemberships")}>
          Crear Membresía
        </button>
        <button className="py-2 hover:bg-gray-300" onClick={() => onSelect("MembershipList")}>
          Lista de Membresías
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
