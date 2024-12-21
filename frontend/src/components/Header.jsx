import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Container } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileModal from "./ProfileModal";
import Cart from "./ecommerce/Cart";
import { UserContext } from "../context/UserContext";
import logoImg from "../components/img/logo.png";
import RegisterAlert from "./RegisterAlert"; // Usamos RegisterAlert aquí

const Header = ({ store }) => {
  const { user } = useContext(UserContext); // Obtener si hay un usuario logueado
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Estado para la alerta
  const navigate = useNavigate();
  const profileButtonRef = useRef(null); // Creación de la referencia para el botón de perfil

  // Función que maneja los clics en las secciones restringidas
  const handleRestrictedClick = (path) => {
    if (!user) {
      setShowAlert(true); 
    } else {
      navigate(path); 
    }
  };

  return (
    <>
      <AppBar position="fixed" className="bg-colors-1 shadow-md h-[5rem]">
        <Container maxWidth="lg" className="h-full">
          <Toolbar disableGutters className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Link to="/principal" className="flex items-center">
                <img src={logoImg} alt="Logo" className="h-14 w-14 rounded-full" />
              </Link>
            </div>
            <nav className="flex-1 flex justify-center space-x-6">
              <Link to="/principal" className="text-secondary hover:text-tertiary text-lg font-bold">
                Home
              </Link>
              <Link to="/somos" className="text-secondary hover:text-tertiary text-lg font-bold">
                Somos
              </Link>
              <Link
                onClick={() => handleRestrictedClick('/actividades')}
                className="text-secondary hover:text-tertiary text-lg font-bold cursor-pointer"
              >
                Actividades
              </Link>
              <Link
                onClick={() => handleRestrictedClick('/grupos')}
                className="text-secondary hover:text-tertiary text-lg font-bold cursor-pointer"
              >
                Grupos
              </Link>
              <Link
                onClick={() => handleRestrictedClick('/store')}
                className="text-secondary hover:text-tertiary text-lg font-bold cursor-pointer"
              >
                Tienda
              </Link>
              <Link to="/aula" className="text-secondary hover:text-tertiary text-lg font-bold">
                Aula virtual
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              {store && (
                <IconButton color="inherit" onClick={() => setShowCart(!showCart)}>
                  <ShoppingCartIcon className="text-white text-3xl" />
                </IconButton>
              )}
              <IconButton
                color="inherit"
                onClick={() => setShowProfile(!showProfile)}
                ref={profileButtonRef} // Referencia del botón de perfil
              >
                <AccountCircleIcon className="text-white text-3xl" />
              </IconButton>
              {showProfile && <ProfileModal profileButtonRef={profileButtonRef} />} {/* Pasamos la referencia */}
              {showCart && <Cart />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {showAlert && <RegisterAlert onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default Header;
