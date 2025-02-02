import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../index.css';
import config from "../utils/config.json";

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    setToken(token);
  }, []);

  const verify = useCallback(() => {
    fetch(`${config.apiUrl}/api/clients/verify-email?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(resp => {
        if (!resp.ok) throw new Error("Algo salió mal");
        return resp.json();
    })
    .then(data => {
            toast.success("Validado con éxito");
            navigate("/login");
        }
    )
    .catch(error => {
        console.error("Error al registrar:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
    });
  }, [token, navigate]); // Agregamos token y navigate como dependencias de useCallback

  useEffect(() => {
    if (token) {
      verify(); // Ahora no hay warning, porque verify está memorizada con useCallback
    }
  }, [token, verify]); // Usamos verify en las dependencias de useEffect

  return (
    <div>
        <h1>Error en la verificación</h1>
        <Link to="/" className="mt-3 text-colors-1 hover:text-colors-1 text-sm font-medium">Atrás</Link>
    </div>
  )
}

export default VerifyEmail;
