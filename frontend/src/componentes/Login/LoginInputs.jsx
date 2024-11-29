import { useEffect, useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveSessionToken } from "../../features/loginSlice";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css';

const LoginInputs = () => {
    const emailField = useRef(), passField = useRef();
    const dispatch = useDispatch();
    const email = useId(), pass = useId();
    const navigate = useNavigate();
    const [emailFieldLength, setEmailFieldLength] = useState(0);
    const [passFieldLength, setPassFieldLength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => { checkFields(); }, []);
    
    const checkFields = () => {
        setEmailFieldLength(emailField.current.value.length);
        setPassFieldLength(passField.current.value.length);
    };

    const loginHandler = () => {
        const email = emailField.current.value.trim(), pass = passField.current.value.trim();
        if (!email) return toast.error("El email es un campo obligatorio.");
        if (!pass) return toast.error("La contraseña es un campo obligatorio.");
        executeLogin({ email: email, password: pass});
    };

    const executeLogin = loginData => {
        fetch("http://localhost:3001/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Algo salió mal");
            return resp.json();
        })
        .then(data => {
            startSession(data.token); navigate("/principal");
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            toast.error("Ocurrió un error. Inténtalo nuevamente.");
        });
    };

    const startSession = (token) => {
        dispatch(saveSessionToken(token));
        localStorage.setItem("token", token);
    };

    return (
        <div className="flex justify-center mt-12 min-h-screen overflow-hidden">
            <form className="flex flex-col items-center justify-center p-5 w-full max-w-lg border border-black bg-white shadow-lg h-auto max-h-[90vh] rounded-xl gap-2 box-border overflow-hidden transform transition-all duration-300 ease-in-out">
                <figure className="w-1/2 p-4 mb-6">
                    <img src='/svg/Logo.png' alt="logo-tiferet" className="w-full" />
                </figure>
                <div className="mb-4 w-3/4 md:w-1/2">
                    <label htmlFor={email} className="block text-gray-700 text-sm font-medium mb-1">Ingrese su correo electrónico</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" ref={emailField} id={email} onChange={checkFields} />
                </div>
                <div className="relative mb-4 w-3/4 md:w-1/2">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                    <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md p-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500" ref={passField} id={pass} onChange={checkFields} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5">
                        <img src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"} alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="w-6 h-6" />
                    </button>
                </div>
                <input type="button" className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 w-1/3 text-sm" value="Login" onClick={loginHandler} disabled={emailFieldLength === 0 || passFieldLength === 0} />
                <Link to="/register" className="mt-2 text-orange-500 hover:text-orange-600 text-xs font-medium">Registrarse</Link>
                <Link to="/forgotPassword" className="mt-1 text-orange-600 hover:text-orange-900 text-xs font-small">¿Olvidaste tu contraseña?</Link>
            </form>
        </div>
    );
};

export default LoginInputs;
