import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logoImg from "../components/img/logo.png";
import React, { useContext, useState, useEffect, useRef } from "react";
import Cart from "./ecommerce/Cart";
import { UserContext } from "../context/UserContext";
import ProfileModal from "./ProfileModal";

const Header = ({ store }) => {
  const { user } = useContext(UserContext);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [cart, setCart] = useState(false);

  const profileButtonRef = useRef(null); // Referencia al botón de perfil

  useEffect(() => {
    if (store) {
      setCart(true);
    }
  }, [store]);

  return (
    <header className="bg-colors-1 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        <Link to="/principal" className="flex items-center">
          <img src={logoImg} alt="Logo" className="h-14 w-14 rounded-full" />{" "}
        </Link>
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
          <Link to="/blog" className="text-black hover:text-gray-700 text-lg">
            Blog
          </Link>
          <Link to="/store" className="text-black hover:text-gray-700 text-lg">
            Tienda
          </Link>
          <Link to="/aula" className="text-black hover:text-gray-700 text-lg">
            Aula virtual
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {cart && (
            <button
              className="header-button"
              onClick={() => setShowCart(!showCart)}
            >
              🛒
            </button>
          )}
          <button
            className="header-button"
            onClick={() => setShowProfile(!showProfile)}
            ref={profileButtonRef} // Asignar la referencia al botón
          >
            <FaUserCircle className="text-black text-3xl" />
          </button>
          {showProfile && <ProfileModal profileButtonRef={profileButtonRef} />}
          {showCart && <Cart />}
        </div>
      </div>
    </header>
  );
};

export default Header;
