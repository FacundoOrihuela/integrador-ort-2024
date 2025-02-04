import React, { useEffect, useId, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { validateEmail } from "../utils/validateRegister";
import "../index.css";
import config from "../utils/config.json";

const ForgotPass = () => {
  const email = useId();
  const navigate = useNavigate();
  const emailField = useRef();

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

  useEffect(() => {
    if (window.localStorage.getItem("idUsuarioLogueado") !== null)
      navigate("/principal");
  }, [navigate]);

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
      .then((data) => {
        toast.success("Email de recuperación enviado");
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      });
  };
  return (
    <div className="flex justify-center mt-12">
    <ToastContainer />
      <form
        className="flex flex-col items-center justify-center self-end"
        onSubmit={handleReset}
      >
        <div className="mb-2 w-1/2">
          <label
            htmlFor={email}
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-colors-1 input-transparente"
            ref={emailField}
            id={email}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-colors-1 text-white font-semibold rounded-md hover:bg-colors-1 focus:outline-none focus:ring-2 focus:ring-colors-1 focus:ring-opacity-50"
        >
          Enviar recuperación
        </button>
        <Link
          to="/"
          className="mt-3 text-colors-1 hover:text-colors-1 text-sm font-medium"
        >
          Atrás
        </Link>
      </form>
    </div>
  );
};

export default ForgotPass;
