import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logoImg from "../components/img/logo.png"; 

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-6 px-8">
                <div className="flex items-center">
                    <img src={logoImg} alt="Logo" className="h-14 w-14"/>
                    <span className="ml-3 text-2xl font-bold text-orange-600">Tiféret</span>
                </div>
                <nav className="space-x-6">
                    <Link to="/" className="text-black hover:text-orange-600 text-lg">Home</Link>
                    <Link to="/somos" className="text-black hover:text-orange-600 text-lg">Somos</Link>
                    <Link to="/events" className="text-black hover:text-orange-600 text-lg">Actividades</Link> 
                    <Link to="/grupos" className="text-black hover:text-orange-600 text-lg">Grupos</Link>
                    <Link to="/tienda" className="text-black hover:text-orange-600 text-lg">Tienda</Link>
                    <Link to="/aula" className="text-black hover:text-orange-600 text-lg">Aula virtual</Link>
                </nav>
                <div>
                    <FaUserCircle className="text-orange-600 text-3xl"/>
                </div>
            </div>
        </header>
    );

  }
export default Header;
