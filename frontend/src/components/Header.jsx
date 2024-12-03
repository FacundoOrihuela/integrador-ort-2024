import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSessionToken } from "../features/loginSlice";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    dispatch(saveSessionToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuarioLogueado");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img
            src="/path-to-your-image/yoga.png"
            alt="Tiferet Logo"
            className="h-10 w-10"
          />
          <span className="ml-2 text-xl font-bold text-orange-500">Tiferet</span>
        </div>
        <nav className="flex space-x-4">
          <Link to="/principal" className="text-gray-700 hover:text-orange-500">
            Home
          </Link>
          <Link to="/somos" className="text-gray-700 hover:text-orange-500">
            Somos
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-orange-500">
            Eventos
          </Link>
          <Link to="/productos" className="text-gray-700 hover:text-orange-500">
            Productos
          </Link>
          <Link to="/store" className="text-gray-700 hover:text-orange-500">
            Tienda Online
          </Link>
          {user && user.userType === "administrator" && (
            <Link to="/admin-panel" className="text-gray-700 hover:text-orange-500">
              Panel Administrativo
            </Link>
          )}
        </nav>
        <div className="header-right">
          <button className="header-button">🛒</button>
          <button className="header-button">🔒</button>
          <div className="header-link" onClick={handleLogout}>
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
