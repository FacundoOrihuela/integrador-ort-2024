import { useNavigate } from 'react-router-dom';
import LoginInputs from './LoginInputs';
import { useEffect } from 'react';
import fondoImg from "../img/fondo.jpg"; // Importar la imagen

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem("idUsuarioLogueado") !== null) {
            navigate("/principal");
        }
    }, []);

    return (
        <section
            className="flex justify-center items-center h-screen w-screen bg-cover bg-colors-1"
            style={{
                backgroundImage: `url(${fondoImg})`,
                backgroundPosition: 'right', 
                backgroundSize: 'cover',                            
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <LoginInputs />
            </div>
        </section>
    );
};

export default Login;
