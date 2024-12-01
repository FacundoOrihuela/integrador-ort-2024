import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveSessionToken } from '../features/loginSlice';

const Header = (user) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(saveSessionToken(null));
    localStorage.removeItem("token"); 
    localStorage.removeItem("idUsuarioLogueado");
    navigate("/");
};
  return (
    <div className="header">
      <div className="header-link" onClick={handleLogout}>Cerrar sesión</div>
      <div className="header-left">
        <Link to="/principal" className="header-link">Home</Link>
        <Link to="/somos" className="header-link">Somos</Link>
        <Link to="/events" className="header-link">Eventos</Link>
        <Link to="/productos" className="header-link">Productos</Link>
        <Link to="/tienda-online" className="header-link">Tienda Online</Link>
        <Link to="/admin-panel" className={user.user.userType=="administrator"?"header-link":"empty"}>Panel Administrativo</Link>
      </div>
      <div className="header-right">
        <button className="header-button">❤️</button>
        <button className="header-button">🛒</button>
        <button className="header-button">🔒</button>
      </div>
    </div>
  );
};

export default Header;
