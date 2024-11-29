import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveSessionToken } from '../features/loginSlice';
import Evento from './Evento/Evento';  
import Header from './Header';  
import Sidebar from './Sidebar';


const Principal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(saveSessionToken(null));
        localStorage.removeItem("token"); 
        localStorage.removeItem("idUsuarioLogueado");

        navigate("/");
    };

    return (
        <div>
            <h1>Principal</h1>
        <Header/>
        <Sidebar/>
        <Evento />

            <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Cerrar sesión
            </button>
        </div>
    );
};

export default Principal;
