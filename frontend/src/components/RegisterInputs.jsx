import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/validateRegister";
import "../index.css";
import config from "../utils/config.json";

const RegisterInputs = () => {
  const user = useId();
  const email = useId();
  const pass = useId();
  const repeatPass = useId();
  const navigate = useNavigate();
  const userField = useRef();
  const emailField = useRef();
  const passField = useRef();
  const repeatPassField = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!userField.current.value) {
      toast.error("El campo de nombre está vacío");
      return;
    }
    if (!emailField.current.value) {
      toast.error("El campo de email está vacío");
      return;
    }
    if (!validateEmail(emailField.current.value)) {
      toast.error("Email no válido");
      return;
    }
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

    const newUser = {
      name: userField.current.value,
      email: emailField.current.value,
      password: passField.current.value,
    };

    registerUser(newUser);
  };

  const registerUser = (newUser) => {
    setIsLoading(true);
    fetch(`${config.apiUrl}/api/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Algo salió mal");
        return resp.json();
      })
      .then(() => {
        toast.success(
          "Registro exitoso! Te enviamos un correo electrónico para verificar tu email :)"
        );
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <form className="my-8 flex flex-col items-center justify-center p-6 w-full max-w-md border border-gray-300 bg-white shadow-md h-auto max-h-[97vh] rounded-lg gap-4 box-border transform transition-transform duration-300 ease-in-out">
      <figure className="w-1/4 mb-4">
        <img src="/svg/Logo.png" alt="logo-Tiféret" className="w-full" />
      </figure>
      <div className="w-full">
        <label
          htmlFor={user}
          className="block text-gray-600 text-[0.7em] font-medium mb-2"
        >
          Nombre
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-[1vh] text-[0.8em] focus:outline-none focus:ring-2 focus:ring-colors-1"
          ref={userField}
          id={user}
        />
      </div>
      <div className="w-full">
        <label
          htmlFor={email}
          className="block text-gray-600 text-[0.7em] font-medium mb-2"
        >
          Email
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-[1vh] text-[0.8em] focus:outline-none focus:ring-2 focus:ring-colors-1"
          ref={emailField}
          id={email}
        />
      </div>
      <div className="w-full relative">
        <label
          htmlFor={pass}
          className="block text-gray-600 text-[0.7em] font-medium mb-2"
        >
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border border-gray-300 rounded-lg px-3 py-[1vh] pr-10 text-[0.8em] focus:outline-none focus:ring-2 focus:ring-colors-1"
          ref={passField}
          id={pass}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-[3%]"
        >
          <img
            src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"}
            alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="w-5 h-5"
          />
        </button>
      </div>
      <div className="w-full relative">
        <label
          htmlFor={repeatPass}
          className="block text-gray-600 text-[0.7em] font-medium mb-2"
        >
          Repetir Contraseña
        </label>
        <input
          type={showRepeatPassword ? "text" : "password"}
          className="w-full border border-gray-300 rounded-lg px-3 py-[1vh] pr-10 text-[0.8em] focus:outline-none focus:ring-2 focus:ring-colors-1"
          ref={repeatPassField}
          id={repeatPass}
        />
        <button
          type="button"
          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-[3%]"
        >
          <img
            src={showRepeatPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"}
            alt={
              showRepeatPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            className="w-5 h-5"
          />
        </button>
      </div>
      <button
        type="submit"
        className={`w-full py-2 text-[0.8em] font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none ${
          isLoading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-colors-1 text-white focus:ring-2 focus:ring-colors-1"
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
            <span className="ml-2">Cargando...</span>
          </div>
        ) : (
          "Registrarme"
        )}
      </button>

      <Link
        to="/login"
        className="mt-1 text-colors-1 hover:text-colors-3 text-[0.8em] font-medium"
      >
        Login
      </Link>
    </form>
  );
};

export default RegisterInputs;
