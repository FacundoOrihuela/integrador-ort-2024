import React, { useContext, useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { saveSessionToken } from "../features/loginSlice";
import { UserContext } from "../context/UserContext";

const ProfileModal = ({ profileButtonRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (profileButtonRef && profileButtonRef.current) {
      const buttonRect = profileButtonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX - 256,
      });
    }
  }, [profileButtonRef]);

  const handleLogout = () => {
    dispatch(saveSessionToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuarioLogueado");
    navigate("/login");
  };

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg z-50 w-64 max-w-full"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="flex flex-col">
        <button className="text-white py-2 px-4 rounded-t-lg bg-black hover:bg-gray-500">
          Gestionar mi perfil
        </button>
        <button className="text-white py-2 px-4 bg-black hover:bg-gray-500">
          Mis cursos
        </button>
        <Link to="/purchase-history" className="text-white py-2 px-4 bg-black hover:bg-gray-500">
          Mis compras
        </Link>
        {user && user.userType === "administrator" && (
          <Link to="/admin-panel" className="text-white py-2 px-4 bg-black hover:bg-gray-500">
            Panel Administrativo
          </Link>
        )}
        <button
          className="text-white py-2 px-4 rounded-b-lg bg-black hover:bg-gray-500"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
