import { useEffect, useId, useRef, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { saveSessionToken } from "../../features/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import config from "../../utils/config.json";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginInputs = () => {
  const emailField = useRef();
  const passField = useRef();
  const dispatch = useDispatch();
  const email = useId();
  const pass = useId();
  const navigate = useNavigate();
  const [emailFieldLength, setEmailFieldLength] = useState(0);
  const [passFieldLength, setPassFieldLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(UserContext);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    emailField.current.value = "admin@gmail.com";
    passField.current.value = "Admin123";
    checkFields();
  }, []);

  const checkFields = () => {
    setEmailFieldLength(emailField.current.value.length);
    setPassFieldLength(passField.current.value.length);
  };

  const loginHandler = async () => {
    const email = emailField.current.value.trim();
    const pass = passField.current.value.trim();
    if (!email) {
      toast.error("El email es un campo obligatorio.");
      return;
    }
    if (!pass) {
      toast.error("La contraseña es un campo obligatorio.");
      return;
    }

    await executeLogin({ email: email, password: pass });
  };

  const executeLogin = async (loginData) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/auth/login`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      if (data.user.status === "blocked") {
        setBlockReason(data.user.blockReason);
        setBlockDialogOpen(true);
        setIsLoading(false);
        return;
      }

      startSession(data.token, data.user);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Ocurrió un error. Inténtalo nuevamente.");
      } else if (error.request) {
        toast.error("No se pudo conectar con el servidor. Por favor, inténtalo más tarde.");
      } else {
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      }
      setIsLoading(false);
    }
  };

  const startSession = (token, user) => {
    dispatch(saveSessionToken(token));
    login(user, token);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loginHandler();
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        className="flex flex-col items-center p-3 gap-2 max-w-full w-full mx-auto"
        onKeyDown={handleKeyDown}
      >
        <figure className="w-2/3 md:w-1/2 p-3 mb-4">
          <img src="/svg/Logo.png" alt="logo-Tiféret" className="w-full" />
        </figure>
        <div className="w-full max-w-sm mb-3">
          <label
            htmlFor={email}
            className="block text-gray-700 text-[0.7em] font-medium mb-1"
          >
            Ingrese su correo electrónico
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-[1vh] text-[0.8em] focus:outline-none focus:ring-2 focus:ring-colors-1"
            ref={emailField}
            id={email}
            onChange={checkFields}
          />
        </div>
        <div className="relative w-full max-w-sm mb-3">
          <label
            htmlFor={pass}
            className="block text-gray-700 text-[0.7em] font-medium mb-1"
          >
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-md p-[1vh] text-[0.8em] pr-8 focus:outline-none focus:ring-2 focus:ring-colors-1"
            ref={passField}
            id={pass}
            onChange={checkFields}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-[3%]"
          >
            <img
              src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="w-[18px] h-[18px]"
            />
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        )}
        <button
          type="button"
          className={`px-3 py-1.5 font-semibold rounded-md w-full text-[0.8em] transition-all duration-200 ease-in-out focus:outline-none ${
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-colors-1 text-white focus:ring-2 focus:ring-colors-1"
          }`}
          onClick={loginHandler}
          disabled={
            isLoading || emailFieldLength === 0 || passFieldLength === 0
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 border-2 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Cargando...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>

        <button
          type="button"
          className="px-3 py-1.5 font-semibold rounded-md w-full text-[0.8em] transition-all duration-200 ease-in-out focus:outline-none bg-colors-1 text-white focus:ring-2 focus:ring-colors-1"
          onClick={() => navigate("/")}
        >
          Entrar sin Registrarme
        </button>

        <Link
          to="/register"
          className="mt-1 text-colors-1 hover:text-colors-1 text-[0.7em] font-medium"
        >
          Registrarse
        </Link>
        <Link
          to="/forgotPassword"
          className="mt-1 text-colors-1 hover:text-orange-900 text-[0.7em] font-small"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </form>

      <Dialog open={blockDialogOpen} onClose={() => setBlockDialogOpen(false)}>
        <DialogTitle>Usuario Bloqueado</DialogTitle>
        <DialogContent>
          <p>Tu cuenta ha sido bloqueada.</p>
          <p>Razón: {blockReason}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBlockDialogOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginInputs;
