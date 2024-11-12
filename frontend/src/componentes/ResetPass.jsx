import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveSessionToken } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from "../utils/validateRegister";
import '../index.css';

const ResetPass = () => {
    
    const pass = useId();
    const repeatPass = useId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userField = useRef();
    const emailField = useRef();
    const passField = useRef();
    const repeatPassField = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        setToken(token);
      }, []);

    const handleResetPass = (e) => {
        e.preventDefault();

        if (!passField.current.value) {
            toast.error("El campo de contraseña está vacío");
            return;
        }
        if (!validatePassword(passField.current.value)){
            toast.error('La contraseña debe tener al menos 8 caracteres, 1 número y una mayúscula');
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
        fetch("http://localhost:3001/api/password/reset", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pass)
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Algo salió mal");
            return resp.json();
        })
        .then(data => {
                toast.success("Cambio de contraseña exitoso");
            }
        )
        .catch(error => {
            console.error("Error al registrar:", error);
            toast.error("Ocurrió un error. Inténtalo nuevamente.");
        });
    };

    useEffect(() => {
        if (window.localStorage.getItem("idUsuarioLogueado") !== null) navigate("/principal")
    }, [])

    return (
        <div className='flex justify-center mt-12'>
            
            <form className="flex flex-col items-center justify-center self-end" onSubmit={handleResetPass}>
                <h1 className="mb-3 w-1/2 relative font-medium">Cambiar contraseña</h1>
                <div className="mb-3 w-1/2 relative">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                    <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={passField} id={pass} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5">
                        <img src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"} alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="w-6 h-6" />
                    </button>
                </div>
                <div className="mb-3 w-1/2 relative">
                    <label htmlFor={repeatPass} className="block text-gray-700 text-sm font-medium mb-1">Repetir Contraseña</label>
                    <input type={showRepeatPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={repeatPassField} id={repeatPass} />
                    <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5">
                        <img src={showRepeatPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"} alt={showRepeatPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="w-6 h-6" />
                    </button>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Cambiar contraseña</button>
                <Link to="/" className="mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium">Login</Link>
            </form>
        </div>
    );

}

export default ResetPass