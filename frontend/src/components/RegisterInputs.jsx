import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from "../utils/validateRegister";
import '../index.css';

const RegisterInputs = () => {
    const user = useId();
    const email = useId();
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
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

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
            toast.error('Email no válido');
            return;
        }
        if (!passField.current.value) {
            toast.error("El campo de contraseña está vacío");
            return;
        }
        if (!validatePassword(passField.current.value)) {
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

        const newUser = {
            name: userField.current.value,
            email: emailField.current.value,
            password: passField.current.value,
        };

        registerUser(newUser);
    };

    const registerUser = (newUser) => {
        setIsLoading(true); // Activar estado de carga
        fetch("http://localhost:3001/api/clients", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Algo salió mal");
            return resp.json();
        })
        .then(() => {
            toast.success("Registro exitoso! Te enviamos un correo electrónico para verificar tu email :)");
        })
        .catch(error => {
            console.error("Error al registrar:", error);
            toast.error("Ocurrió un error. Inténtalo nuevamente.");
        })
        .finally(() => {
            setIsLoading(false); // Desactivar estado de carga
        });
    };

    useEffect(() => {
        if (window.localStorage.getItem("idUsuarioLogueado") !== null) navigate("/principal");
    }, [navigate]);

    return (
        <div className='flex justify-center mt-12'>
            <form 
                className="flex flex-col items-center justify-center p-5 w-full max-w-lg border border-black bg-white shadow-lg h-auto max-h-[90vh] rounded-xl gap-2 box-border overflow-hidden transform transition-all duration-300 ease-in-out" 
                onSubmit={handleRegister}
            >
                <figure className="w-1/4 p-4 mb-6">
                    <img src='/svg/Logo.png' alt="logo-tiferet" className="w-full" />
                </figure>
                <div className="mb-2 w-1/2">
                    <label htmlFor={user} className="block text-gray-700 text-sm font-medium mb-1">Nombre</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" ref={userField} id={user} />
                </div>
                <div className="mb-2 w-1/2">
                    <label htmlFor={email} className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" ref={emailField} id={email} />
                </div>
                <div className="mb-3 w-1/2 relative">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                    <input type={showPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500" ref={passField} id={pass} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5">
                        <img src={showPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"} alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="w-6 h-6" />
                    </button>
                </div>
                <div className="mb-3 w-1/2 relative">
                    <label htmlFor={repeatPass} className="block text-gray-700 text-sm font-medium mb-1">Repetir Contraseña</label>
                    <input type={showRepeatPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500" ref={repeatPassField} id={repeatPass} />
                    <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-y-0.5">
                        <img src={showRepeatPassword ? "/svg/eyeClosed.svg" : "/svg/eyeOpen.svg"} alt={showRepeatPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="w-6 h-6" />
                    </button>
                </div>

                {/* Botón con indicador de carga */}
                <button 
                    type="submit" 
                    className={`px-4 py-2 font-semibold rounded-md w-1/3 text-sm ${isLoading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500"}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="w-4 h-4 border-2 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
                            <span className="ml-2">Cargando...</span>
                        </div>
                    ) : (
                        "Registrarme"
                    )}
                </button>
                <Link to="/" className="mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium">Login</Link>
            </form>
        </div>
    );
};

export default RegisterInputs;
