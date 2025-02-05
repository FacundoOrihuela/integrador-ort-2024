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
  Drawer,
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
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ store }) => {
  const { user } = useContext(UserContext);
  const [showFav, setShowFav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileButtonRef = useRef(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="sticky" className="bg-colors-1 shadow-md">
        <Container maxWidth="lg" className="px-4 md:px-8">
          <Toolbar disableGutters className="flex justify-between items-center">
            <IconButton
              className="md:flex items-center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Link to="/" className="flex items-center">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="h-10 w-10 sm:h-14 sm:w-14 rounded-full"
                />
              </Link>
            </IconButton>

            <div className="flex items-center gap-2 md:hidden">
  <IconButton
    color="inherit"
    onClick={() => setDrawerOpen(true)}
    className="bg-gray-300 p-1 rounded-md border border-gray-400 shadow-sm hover:bg-gray-400 hover:shadow-md transition"
    sx={{
      bgcolor: "rgba(260, 98, 30, 0.7)",
      border: "0.2px solid rgba(0, 0, 0, 0.8)",
    }}
  >
    <MenuIcon className="text-gray-100" fontSize="small" />
  </IconButton>
</div>


            <nav className="hidden md:flex flex-1 justify-center space-x-6">
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
                    isActive("/aboutTiferet") ||
                    isActive("/members") ||
                    isActive("/together") ||
                    isActive("/history")
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
                        isActive("/aboutTiferet")
                          ? "border-white"
                          : "border-transparent"
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
                        isActive("/members")
                          ? "border-white"
                          : "border-transparent"
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
                        isActive("/together")
                          ? "border-white"
                          : "border-transparent"
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
                        isActive("/history")
                          ? "border-white"
                          : "border-transparent"
                      } hover:border-white`}
                    >
                      Nuestra Historia
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
              <span
                onClick={() => navigate("/actividades")}
                className={`text-secondary text-lg font-bold cursor-pointer border-b-2 ${
                  isActive("/actividades")
                    ? "border-white"
                    : "border-transparent"
                } hover:border-white`}
              >
                Actividades
              </span>
              <span
                onClick={() => navigate("/store")}
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
              {store && user && (
                <div>
                  <IconButton
                    color="inherit"
                    onClick={() => setShowFav(!showFav)}
                  >
                    <Favorite className="text-white text-2xl" />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => setShowCart(!showCart)}
                  >
                    <ShoppingCartIcon className="text-white text-2xl" />
                  </IconButton>
                </div>
              )}

              {user ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={() => setShowProfile(!showProfile)}
                    ref={profileButtonRef}
                  >
                    {user.photo ? (
                      <Avatar
                        src={user.photo}
                        alt="Profile Photo"
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      />
                    ) : (
                      <AccountCircleIcon className="text-white text-2xl sm:text-3xl" />
                    )}
                  </IconButton>
                  <Typography
                    variant="body1"
                    className="text-white hidden sm:block"
                  >
                    ¡Hola, {user.name}!
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
                    className={`text-secondary text-lg font-bold ${
                      isActive("/login") ? "border-white" : "border-transparent"
                    } hover:border-white`}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className={`text-secondary text-lg font-bold ${
                      isActive("/register")
                        ? "border-white"
                        : "border-transparent"
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="w-64 bg-white text-black p-4 h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Menú</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate("/")}
              className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/actividades")}
              className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Actividades
            </button>
            <button
              onClick={() => navigate("/store")}
              className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Tienda
            </button>
            <button
              onClick={() => navigate("/news")}
              className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Noticias
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Contacto
            </button>

            {/* Aquí agregamos el menú "Somos" con todas sus opciones */}
            <div className="border-t border-gray-300 mt-6"></div>
            <div>
              <button
                className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => navigate("/aboutTiferet")}
              >
                ¿Qué es Tiferet?
              </button>
              <button
                className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => navigate("/members")}
              >
                Integrantes
              </button>
              <button
                className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => navigate("/together")}
              >
                Solo Juntos
              </button>
              <button
                className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => navigate("/history")}
              >
                Nuestra Historia
              </button>
            </div>
          </div>
        </div>
      </Drawer>

      {showAlert && (
        <RegisterAlert open={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </>
  );
};

export default Header;
