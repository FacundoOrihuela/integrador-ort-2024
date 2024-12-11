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
    if (profileButtonRef.current) {
      // Accedemos a la posición del botón después de que todos los cambios se hayan completado
      const buttonRect = profileButtonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY, // Posiciona debajo del botón
        left: buttonRect.left + window.scrollX - 256, // Restamos el ancho del modal para alinearlo a la izquierda
      });
    }
  }, [profileButtonRef]); // Este efecto se ejecuta solo cuando el perfil se muestra

  const handleLogout = () => {
    dispatch(saveSessionToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuarioLogueado");
    navigate("/");
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
          <Link
            to="/admin-panel"
            className="text-white py-2 px-4 bg-black hover:bg-gray-500"
          >
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
