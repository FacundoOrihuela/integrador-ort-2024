import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AppBar, Toolbar, IconButton, Container } from "@mui/material";
import ProfileModal from "./ProfileModal";
import Cart from "./ecommerce/Cart";
import { UserContext } from "../context/UserContext";
import logoImg from "../components/img/logo.png";

const Header = ({ store }) => {
  const { user } = useContext(UserContext);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [cart, setCart] = useState(false);

  const profileButtonRef = useRef(null);

  useEffect(() => {
    if (store) {
      setCart(true);
    }
  }, [store]);

  return (
    <AppBar position="fixed" className="bg-colors-1 shadow-md h-[5rem]">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          className="flex justify-between items-center h-full"
        >
          <Link to="/principal" className="flex items-center">
            <img src={logoImg} alt="Logo" className="h-14 w-14 rounded-full" />
          </Link>
          <nav className="space-x-6">
            <Link
              to="/principal"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Home
            </Link>
            <Link
              to="/somos"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Somos
            </Link>
            <Link
              to="/actividades"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Actividades
            </Link>
            <Link
              to="/grupos"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Grupos
            </Link>
            <Link
              to="/blog"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Blog
            </Link>
            <Link
              to="/store"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Tienda
            </Link>
            <Link
              to="/aula"
              className="text-secondary hover:text-tertiary text-lg font-bold"
            >
              Aula virtual
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {cart && (
              <IconButton
                color="inherit"
                onClick={() => setShowCart(!showCart)}
              >
                🛒
              </IconButton>
            )}
            <IconButton
              color="inherit"
              onClick={() => setShowProfile(!showProfile)}
              ref={profileButtonRef}
            >
              <FaUserCircle className="text-black text-3xl" />
            </IconButton>
            {showProfile && (
              <ProfileModal profileButtonRef={profileButtonRef} />
            )}
            {showCart && <Cart />}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
