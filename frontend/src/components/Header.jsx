import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logoImg from "../components/img/logo.png";
import React, { useContext, useState, useEffect, } from "react";
import Cart from "./ecommerce/Cart";
import { UserContext } from "../context/UserContext";

const Header = ({ store }) => {
  const { user } = useContext(UserContext);
  const [showCart, setShowCart] = useState(false);
  const [Cart, setCart] = useState(false);

  useEffect(() => {
    console.log(store)
    if(store){
      setCart(true)
    }
  }, [store])
  return (
    <header className="bg-colors-1 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        <div className="flex items-center">
          <img src={logoImg} alt="Logo" className="h-14 w-14 rounded-full" />{" "}
        </div>
        <nav className="space-x-6">
          <Link to="/principal" className="text-black hover:text-gray-700 text-lg">
            Home
          </Link>
          <Link to="/somos" className="text-black hover:text-gray-700 text-lg">
            Somos
          </Link>
          <Link to="/events" className="text-black hover:text-gray-700 text-lg">
            Actividades
          </Link>
          <Link to="/grupos" className="text-black hover:text-gray-700 text-lg">
            Grupos
          </Link>
          <Link to="/store" className="text-black hover:text-gray-700 text-lg">
            Tienda
          </Link>
          <Link to="/aula" className="text-black hover:text-gray-700 text-lg">
            Aula virtual
          </Link>
          {user && user.userType === "administrator" && (
            <Link to="/admin-panel" className="header-link">
              Panel Administrativo
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {Cart && <button
            className="header-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛒
          </button>}
          <FaUserCircle className="text-black text-3xl" />
          {showCart && <Cart />}
        </div>
        
      </div>
    </header>
  );
};

export default Header;
