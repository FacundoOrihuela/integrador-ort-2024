import React, { useEffect, useId, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { validateEmail } from "../utils/validateRegister";
import fondoImg from "./img/fondo.jpg";
import "../index.css";
import config from "../utils/config.json";

const ForgotPass = () => {
  const email = useId();
  const navigate = useNavigate();
  const emailField = useRef();

  useEffect(() => {
    if (window.localStorage.getItem("idUsuarioLogueado") !== null)
      navigate("/principal");
  }, [navigate]);

  const handleReset = (e) => {
    e.preventDefault();

    if (!emailField.current.value) {
      toast.error("El campo de email está vacío");
      return;
    }
    if (!validateEmail(emailField.current.value)) {
      toast.error("Email no válido");
      return;
    }

    const user = {
      email: emailField.current.value,
    };

    forgotPass(user);
  };

  const forgotPass = (user) => {
    fetch(`${config.apiUrl}/api/password/request-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Algo salió mal");
        return resp.json();
      })
      .then(() => {
        toast.success("Email de recuperación enviado");
      })
      .catch((error) => {
        console.error("Error al solicitar recuperación:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      });
  };

  return (
    <section
      className="flex justify-center items-center h-screen w-screen bg-cover bg-colors-1 p-4 md:p-0"
      style={{
        backgroundImage: `url(${fondoImg})`,
        backgroundPosition: "right",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-4 max-h-[97%] min-h-[80%]">
        <ToastContainer />
        <form className="flex flex-col items-center p-3 gap-2 w-full" onSubmit={handleReset}>
          <figure className="w-2/3 md:w-1/2 p-3 mb-4">
            <img src="/svg/Logo.png" alt="logo-Tiféret" className="w-full" />
          </figure>
          <div className="w-full max-w-sm mb-3">
            <label htmlFor={email} className="block text-gray-700 text-[0.7em] font-medium mb-1">
              Ingrese su correo electrónico
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-[1vh] text-[0.8em] focus:outline-none focus:ring-2 focus:ring-colors-1"
              ref={emailField}
              id={email}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 font-semibold rounded-md w-full text-[0.8em] transition-all duration-200 ease-in-out focus:outline-none bg-colors-1 text-white focus:ring-2 focus:ring-colors-1"
          >
            Enviar recuperación
          </button>
          <Link
            to="/login"
            className="mt-3 text-colors-1 hover:text-orange-900 text-[0.7em] font-medium"
          >
            Volver al inicio
          </Link>
        </form>
      </div>
    </section>
  );
};

export default ForgotPass;
