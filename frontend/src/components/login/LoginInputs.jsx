import { useEffect, useId, useRef, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { saveSessionToken } from "../../features/loginSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

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

  useEffect(() => {
    // Set default values
    emailField.current.value = "tayet.nunez@gmail.com";
    passField.current.value = "Juan1234";
    checkFields();
  }, []);

  const checkFields = () => {
    setEmailFieldLength(emailField.current.value.length);
    setPassFieldLength(passField.current.value.length);
  };

  const loginHandler = () => {
    const email = emailField.current.value.trim();
    const pass = passField.current.value.trim();
    if (!email) return toast.error("El email es un campo obligatorio.");
    if (!pass) return toast.error("La contraseña es un campo obligatorio.");
    executeLogin({ email: email, password: pass });
  };

  const executeLogin = (loginData) => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })
        .then((resp) => {
          if (!resp.ok) {
            if (resp.status === 401) {
              return resp.json().then((data) => {
                throw new Error(data.message);
              });
            }
            throw new Error("Algo salió mal");
          }
          return resp.json();
        })
        .then((data) => {
          if (data.user.status === "blocked") {
            setBlockReason(data.user.blockReason);
            setBlockDialogOpen(true);
            setIsLoading(false);
            return;
          }
          startSession(data.token, data.user);
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }, 1500);
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
      <form
        className="flex flex-col items-center p-6 gap-4"
        onKeyDown={handleKeyDown}
      >
        <figure className="w-1/2 p-4 mb-6">
          <img src="/svg/Logo.png" alt="logo-Tiféret" className="w-full" />
        </figure>
        <div className="w-full max-w-sm mb-4">
          <label
            htmlFor={email}
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Ingrese su correo electrónico
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-colors-1"
            ref={emailField}
            id={email}
            onChange={checkFields}
          />
        </div>
        <div className="relative w-full max-w-sm mb-4">
          <label
            htmlFor={pass}
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-md p-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-colors-1"
            ref={passField}
            id={pass}
            onChange={checkFields}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5"
          >
            <img
              src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="w-6 h-6"
            />
          </button>
        </div>

        <button
          type="button"
          className={`px-4 py-2 font-semibold rounded-md w-full text-sm transition-all duration-200 ease-in-out focus:outline-none ${
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-colors-1 text-white focus:ring-2 focus:ring-colors-1"
          }`}
          onClick={loginHandler}
          disabled={isLoading || emailFieldLength === 0 || passFieldLength === 0}
        >
          {isLoading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Cargando...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>

        <button
          type="button"
          className="px-4 py-2 font-semibold rounded-md w-full text-sm transition-all duration-200 ease-in-out focus:outline-none bg-colors-1 text-white focus:ring-2 focus:ring-colors-1"
          onClick={() => navigate("/")}
        >
          Entrar sin Registrarme
        </button>

        <Link
          to="/register"
          className="mt-2 text-colors-1 hover:text-colors-1 text-xs font-medium"
        >
          Registrarse
        </Link>
        <Link
          to="/forgotPassword"
          className="mt-1 text-colors-1 hover:text-orange-900 text-xs font-small"
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
