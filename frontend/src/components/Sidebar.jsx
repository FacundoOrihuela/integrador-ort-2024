import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-logo">Tiferet</p>
        <p className="sidebar-email">{user ? user.email : "Cargando..."}</p>
      </div>
      <div className="sidebar-links">
        <Link to="/eventos" className="sidebar-link">
          Eventos
        </Link>
        <Link to="/yogas" className="sidebar-link">
          Yogas
        </Link>
        <Link to="/charlas" className="sidebar-link">
          Charlas
        </Link>
        <Link to="/psicoterapias" className="sidebar-link">
          Psicoterapias
        </Link>
        <Link to="/meditacion" className="sidebar-link">
          Meditación
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
