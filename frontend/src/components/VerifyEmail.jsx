import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import axios from 'axios';
import '../index.css';
import config from "../utils/config.json";
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    setToken(token);
  }, []);

  const verify = useCallback(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/clients/verify-email`, {
        params: { token },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data.message);

      localStorage.setItem("toastMessage", "Validado con éxito");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Ocurrió un error. Inténtalo nuevamente.";
      toast.error(errorMessage);
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token, verify]);

  return (
    <div>
      <Link to="/" className="mt-3 text-colors-1 hover:text-colors-1 text-sm font-medium">Atrás</Link>
    </div>
  );
}

export default VerifyEmail;
