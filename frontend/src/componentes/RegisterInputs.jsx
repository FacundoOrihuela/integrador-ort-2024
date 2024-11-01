import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { guardarSesionId, guardarSesionToken } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import '../index.css';

const RegisterInputs = () => {
    const URLBASE = "https://babytracker.develotion.com/";
    const user = useId();
    const pass = useId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectIdDep = useId();
    const selectIdCiud = useId();
    const campoUser = useRef();
    const campoPass = useRef();
    const registroHandler = () => {
        let nuevoRegistro = {
            usuario: campoUser.current.value,
            password: campoPass.current.value,
        }
        hacerRegistro(nuevoRegistro);
    }
    const hacerRegistro = nuevoRegistro => {
        fetch(URLBASE + 'usuarios.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoRegistro)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.mensaje !== undefined) {
                    const notify = () => toast.error(data.mensaje);
                    notify();
                } else {
                    iniciarSesion(data)
                    navigate("/dashboard");
                    const notify = () => toast.success("Registro exitoso");
                    notify();
                }
            })

    }
    const iniciarSesion = ({ id, apiKey }) => {
        dispatch(guardarSesionId(id));
        dispatch(guardarSesionToken(apiKey))
        localStorage.setItem("APPBebesToken", apiKey);
        localStorage.setItem("idUsuarioLogueado", id);
    }
    return (
        <div className='flex justify-center mt-12'>
            <form className="flex flex-col items-center justify-center self-end">
                <div className="mb-2 w-1/2">
                    <label htmlFor={user} className="block text-gray-700 text-sm font-medium mb-1">Usuario</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={campoUser} id={user} />
                </div>
                <div className="mb-3 w-1/2">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                    <input type="password" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={campoPass} id={pass} />
                </div>
                <div className="mb-3 w-1/2">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Repetir contraseña</label>
                    <input type="password" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={campoPass} id={pass} />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={registroHandler}>Registrarme</button>
                <Link to="/" className="mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium">Login</Link>
            </form>
        </div>
    );
};

export default RegisterInputs;
