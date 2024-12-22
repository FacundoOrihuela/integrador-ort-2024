import React, { useContext, useState, useLayoutEffect, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { saveSessionToken } from "../features/loginSlice";
import { UserContext } from "../context/UserContext";
import { Box, Typography, Divider } from "@mui/material";

const ProfileModal = ({ profileButtonRef, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const modalRef = useRef(null);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (profileButtonRef && profileButtonRef.current) {
      const buttonRect = profileButtonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
  }, [profileButtonRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = () => {
    dispatch(saveSessionToken(null));
    logout();
    navigate("/login");
  };

  return (
    <Box
      ref={modalRef}
      className="absolute bg-white rounded-lg shadow-lg z-50 w-64 max-w-full"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <Box className="flex flex-col">
        <Typography
          variant="button"
          className="text-colors-1 py-3 px-4 rounded-t-lg bg-white hover:bg-gray-100 cursor-pointer"
        >
          Gestionar mi perfil
        </Typography>
        <Divider className="bg-colors-1 mx-4" />
        <Typography
          variant="button"
          className="text-colors-1 py-3 px-4 bg-white hover:bg-gray-100 cursor-pointer"
        >
          Mis cursos
        </Typography>
        <Divider className="bg-colors-1 mx-4" />
        <Link to="/purchase-history" className="no-underline">
          <Typography
            variant="button"
            className="text-colors-1 py-3 px-4 bg-white hover:bg-gray-100 cursor-pointer"
          >
            Mis compras
          </Typography>
        </Link>
        {user && user.userType === "administrator" && (
          <>
            <Divider className="bg-colors-1 mx-4" />
            <Link to="/admin-panel" className="no-underline">
              <Typography
                variant="button"
                className="text-colors-1 py-3 px-4 bg-white hover:bg-gray-100 cursor-pointer"
              >
                Panel Administrativo
              </Typography>
            </Link>
          </>
        )}
        <Divider className="bg-colors-1 mx-4" />
        <Typography
          variant="button"
          className="text-colors-1 py-3 px-4 rounded-b-lg bg-white hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileModal;
