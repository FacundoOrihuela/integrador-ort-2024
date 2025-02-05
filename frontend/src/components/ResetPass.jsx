import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validatePassword } from "../utils/validateRegister";
import "../index.css";
import config from "../utils/config.json";
import fondoImg from "./img/fondo.jpg";

const ResetPass = () => {
  const pass = useId();
  const repeatPass = useId();
  const navigate = useNavigate();
  const passField = useRef();
  const repeatPassField = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    setToken(token);
  }, []);

  const handleResetPass = (e) => {
    e.preventDefault();

    if (!passField.current.value) {
      toast.error("El campo de contraseña está vacío");
      return;
    }
    if (!validatePassword(passField.current.value)) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres, 1 número y una mayúscula"
      );
      return;
    }
    if (!repeatPassField.current.value) {
      toast.error("El campo de repetir contraseña está vacío");
      return;
    }

    if (passField.current.value !== repeatPassField.current.value) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const pass = {
      token: token,
      password: passField.current.value,
    };

    resetPass(pass);
  };

  const resetPass = (pass) => {
    fetch(`${config.apiUrl}/api/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pass),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Algo salió mal");
        return resp.json();
      })
      .then(() => {
        toast.success("Cambio de contraseña exitoso");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("idUsuarioLogueado") !== null)
      navigate("/principal");
  }, [navigate]);

  return (
    <section
      className="flex justify-center items-center h-screen w-screen bg-cover bg-colors-1 p-4 md:p-0"
      style={{
        backgroundImage: `url(${fondoImg})`,
        backgroundPosition: "right",
        backgroundSize: "cover",
      }}
    >
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleResetPass}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Cambiar contraseña
        </h1>
        <div className="mb-4 relative">
          <label
            htmlFor={pass}
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-colors-1"
              ref={passField}
              id={pass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <img
                src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor={repeatPass}
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Repetir Contraseña
          </label>
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-colors-1"
              ref={repeatPassField}
              id={repeatPass}
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <img
                src={
                  showRepeatPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"
                }
                alt={
                  showRepeatPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-colors-1 text-white font-semibold py-2 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-colors-1"
        >
          Cambiar contraseña
        </button>
        <Link
          to="/login"
          className="block text-center text-colors-1 mt-4 text-sm font-medium hover:underline"
        >
          Volver al inicio
        </Link>
      </form>
    </section>
  );
};

export default ResetPass;
