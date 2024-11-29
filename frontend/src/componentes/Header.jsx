import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="header-link">Home</Link>
        <Link to="/somos" className="header-link">Somos</Link>
        <Link to="/eventos" className="header-link">Eventos</Link>
        <Link to="/productos" className="header-link">Productos</Link>
        <Link to="/tienda-online" className="header-link">Tienda Online</Link>
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
