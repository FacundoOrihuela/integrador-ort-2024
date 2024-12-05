import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSessionToken } from "../features/loginSlice";
import { UserContext } from "../context/UserContext";
import Cart from "./ecommerce/Cart";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showCart, setShowCart] = useState(false);

  const handleLogout = () => {
    dispatch(saveSessionToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuarioLogueado");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-link" onClick={handleLogout}>
        Cerrar sesión
      </div>
      <div className="header-left">
        <Link to="/principal" className="header-link">
          Home
        </Link>
        <Link to="/somos" className="header-link">
          Somos
        </Link>
        <Link to="/events" className="header-link">
          Eventos
        </Link>
        <Link to="/productos" className="header-link">
          Productos
        </Link>
        <Link to="/store" className="header-link">
          Tienda Online
        </Link>

        {user && user.userType === "administrator" && (
          <Link to="/admin-panel" className="header-link">
            Panel Administrativo
          </Link>
        )}
      </div>
      <div className="header-right">
        <button 
          className="header-button" 
          onClick={() => setShowCart(!showCart)}
        >
          🛒
        </button>
        <button className="header-button">🔒</button>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Header;
