import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Favorite from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HistoryIcon from "@mui/icons-material/History";
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
  const location = useLocation();
  const profileButtonRef = useRef(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleRestrictedClick = (path) => {
    if (!user) {
      console.log("Usuario no logueado. Mostrando alerta.");
      setShowAlert(true);
    } else {
      console.log(`Usuario logueado. Redirigiendo a: ${path}`);
      navigate(path);
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="sticky" className="bg-colors-1 shadow-md h-[5rem]">
        <Container maxWidth="lg" className="h-full">
          <Toolbar disableGutters className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logoImg} alt="Logo" className="h-14 w-14 rounded-full" />
              </Link>
            </div>

            <nav className="flex-1 flex justify-center space-x-6">
              <Link
                to="/"
                className={`text-secondary text-lg font-bold border-b-2 ${
                  isActive("/") ? "border-white" : "border-transparent"
                } hover:border-white`}
              >
                Home
              </Link>

              <div>
                <button
                  className={`text-secondary text-lg font-bold relative border-b-2 ${
                    isActive("/aboutTiferet") || isActive("/members") || isActive("/together") || isActive("/history")
                      ? "border-white"
                      : "border-transparent"
                  } hover:border-white`}
                  onClick={handleMenuOpen}
                >
                  Somos
                </button>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <InfoIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Link
                      to="/aboutTiferet"
                      className={`text-black text-lg block border-b-2 ${
                        isActive("/aboutTiferet") ? "border-white" : "border-transparent"
                      } hover:border-white`}
                    >
                      ¿Qué es Tiferet?
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <GroupIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Link
                      to="/members"
                      className={`text-black text-lg block border-b-2 ${
                        isActive("/members") ? "border-white" : "border-transparent"
                      } hover:border-white`}
                    >
                      Integrantes
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <PeopleAltIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Link
                      to="/together"
                      className={`text-black text-lg block border-b-2 ${
                        isActive("/together") ? "border-white" : "border-transparent"
                      } hover:border-white`}
                    >
                      Solo Juntos
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <HistoryIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Link
                      to="/history"
                      className={`text-black text-lg block border-b-2 ${
                        isActive("/history") ? "border-white" : "border-transparent"
                      } hover:border-white`}
                    >
                      Nuestra Historia
                    </Link>
                  </MenuItem>
                </Menu>
              </div>

              <span
                onClick={() => handleRestrictedClick("/actividades")}
                className={`text-secondary text-lg font-bold cursor-pointer border-b-2 ${
                  isActive("/actividades") ? "border-white" : "border-transparent"
                } hover:border-white`}
              >
                Actividades
              </span>
              <span
                onClick={() => handleRestrictedClick("/store")}
                className={`text-secondary text-lg font-bold cursor-pointer border-b-2 ${
                  isActive("/store") ? "border-white" : "border-transparent"
                } hover:border-white`}
              >
                Tienda
              </span>
              <Link
                to="/news"
                className={`text-secondary text-lg font-bold border-b-2 ${
                  isActive("/aula") ? "border-white" : "border-transparent"
                } hover:border-white`}
              >
                Noticias
              </Link>

              <Link
                to="/contact"
                className={`text-secondary text-lg font-bold border-b-2 ${
                  isActive("/contact") ? "border-white" : "border-transparent"
                } hover:border-white`}
              >
                Contacto
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
                  <IconButton color="inherit" onClick={() => setShowProfile(!showProfile)} ref={profileButtonRef}>
                    {user.photo ? (
                      <Avatar src={user.photo} alt="Profile Photo" className="h-10 w-10" />
                    ) : (
                      <AccountCircleIcon className="text-white text-3xl" />
                    )}
                  </IconButton>

                  <Typography variant="body1" className="text-white">
                    ¡Bienvenido, {user.name}!
                  </Typography>
                  {showProfile && <ProfileModal profileButtonRef={profileButtonRef} onClose={() => setShowProfile(false)} />}
                </>
              ) : (
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    className={`text-secondary text-lg font-bold border-b-2 ${
                      isActive("/login") ? "border-white" : "border-transparent"
                    } hover:border-white`}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className={`text-secondary text-lg font-bold border-b-2 ${
                      isActive("/register") ? "border-white" : "border-transparent"
                    } hover:border-white`}
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
