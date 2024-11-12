import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveSessionToken } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from "../utils/validateRegister";
import '../index.css';

const VerifyEmail = () => {
  const [token, setToken] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        setToken(token);
      }, []);

  return (
    <div>
        <h1>Email verificado con éxito!</h1>
        <Link to="/" className="mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium">Login</Link>
    </div>
  )
}

export default VerifyEmail