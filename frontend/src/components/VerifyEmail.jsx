import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token])

  const verify = () => {
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
  };
      
  return (
    <div>
        <h1>Error en la verificación</h1>
        <Link to="/" className="mt-3 text-colors-1 hover:text-colors-1 text-sm font-medium">Atrás</Link>
    </div>
  )
}

export default VerifyEmail