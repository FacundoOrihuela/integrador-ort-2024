import { useEffect, useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveSessionId, saveSessionToken } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const LoginInputs = () => {
    const URL_BASE = "http://localhost:3001/api/clients/login";
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
        executeLogin({ username: email, password: pass });
    };

    const executeLogin = loginData => {
        fetch(URL_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Algo salió mal");
            return resp.json();
        })
        .then(data => {
            if (data.message) toast.error(data.message);
            else { startSession(data); navigate("/principal"); }
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            toast.error("Ocurrió un error. Inténtalo nuevamente.");
        });
    };

    const startSession = ({ id, token }) => {
        dispatch(saveSessionId(id));
        dispatch(saveSessionToken(token));
        localStorage.setItem("APPBebesToken", token);
        localStorage.setItem("idUsuarioLogueado", id);
    };

    return (
        <div className="flex justify-center mt-12">
            <form className="flex flex-col items-center">
                <div className="mb-2 w-1/2">
                    <label htmlFor={email} className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" ref={emailField} id={email} onChange={checkFields} />
                </div>
                <div className="relative mb-3 w-1/2">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                    <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" ref={passField} id={pass} onChange={checkFields} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5">
                        <img src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"} alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="w-6 h-6" />
                    </button>
                </div>
                <input type="button" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/4" value="Login" onClick={loginHandler} disabled={emailFieldLength === 0 || passFieldLength === 0} />
                <Link to="/register" className="mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium">Registrarse</Link>
            </form>
        </div>
    );
};

export default LoginInputs;
