import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveSessionToken } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from "../utils/validateRegister";
import '../index.css';

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
    fetch(`http://localhost:3001/api/clients/verify-email?token=${token}`, {
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
            navigate("/");
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
        <Link to="/" className="mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium">Atrás</Link>
    </div>
  )
}

export default VerifyEmail