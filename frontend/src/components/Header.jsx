import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Container, Typography, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Favorite from "@mui/icons-material/Favorite";
import Favorites from "./ecommerce/Favorites";
import ProfileModal from "./ProfileModal";
import Cart from "./ecommerce/Cart";
import { UserContext } from "../context/UserContext";
import logoImg from "../components/img/logo.png";
import RegisterAlert from "./RegisterAlert";

const Header = ({ store }) => {
  const { user } = useContext(UserContext);
  const [showFav, setShowFav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const profileButtonRef = useRef(null);

  // useEffect(() => {
  //   console.log("Estado del usuario:", user);
  // }, [user]);

  const handleRestrictedClick = (path) => {
    if (!user) {
      console.log("Usuario no logueado. Mostrando alerta.");
      setShowAlert(true);
    } else {
      console.log(`Usuario logueado. Redirigiendo a: ${path}`);
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
              <Link to="/" className="text-secondary hover:text-tertiary text-lg font-bold">
                Home
              </Link>
              <Link to="/somos" className="text-secondary hover:text-tertiary text-lg font-bold">
                Somos
              </Link>
              <span
                onClick={() => handleRestrictedClick("/actividades")}
                className="text-secondary hover:text-tertiary text-lg font-bold cursor-pointer"
              >
                Actividades
              </span>
              <span
                onClick={() => handleRestrictedClick("/store")}
                className="text-secondary hover:text-tertiary text-lg font-bold cursor-pointer"
              >
                Tienda
              </span>
              <Link to="/aula" className="text-secondary hover:text-tertiary text-lg font-bold">
                Aula virtual
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {store && (
                <div>
                 <IconButton color="inherit" onClick={() => setShowFav(!showFav)}>
                   <Favorite className="text-white text-3xl" />
                 </IconButton>
                 <IconButton color="inherit" onClick={() => setShowCart(!showCart)}>
                   <ShoppingCartIcon className="text-white text-3xl" />
                 </IconButton>
               </div>
              )}

              {user ? (
                <>

                  <IconButton
                    color="inherit"
                    onClick={() => setShowProfile(!showProfile)}
                    ref={profileButtonRef}>


                    {user.photo ? (
                      <Avatar src={user.photo} alt="Profile Photo" className="h-10 w-10" />
                    ) : (
                      <AccountCircleIcon className="text-white text-3xl" />
                    )}


                  </IconButton>

                  
                  <Typography variant="body1" className="text-white">
                    ¡Bienvenido, {user.name}!
                  </Typography>
                  {showProfile && (
                    <ProfileModal
                      profileButtonRef={profileButtonRef}
                      onClose={() => setShowProfile(false)}
                    />
                  )}
                </>


              ) : (
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    className="text-secondary hover:text-tertiary text-lg font-bold"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="text-secondary hover:text-tertiary text-lg font-bold"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
              {showFav && <Favorites onClose={() => setShowFav(false)} />}
              {showCart && <Cart onClose={() => setShowCart(false)} />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {showAlert && <RegisterAlert open={showAlert} onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default Header;
