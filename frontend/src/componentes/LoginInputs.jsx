import { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarSesionId, guardarSesionToken, guardarUrlBase } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const LoginInputs = () => {
    const URLBASE = "https://babytracker.develotion.com/";
    const campoUser = useRef();
    const campoPass = useRef();
    const dispatch = useDispatch();
    const usuario = useId();
    const pass = useId();
    const navigate = useNavigate();
    const [usuarioCampo, setUsuarioCampo] = useState(0);
    const [passCampo, setPassCampo] = useState(0);

    useEffect(() => {
        comprobarCampos();
    }, []);

    const comprobarCampos = () => {
        comprobarCampoUsuario();
        comprobarCampoPass();
    };

    const comprobarCampoUsuario = () => {
        setUsuarioCampo(campoUser.current.value.length);
    };

    const comprobarCampoPass = () => {
        setPassCampo(campoPass.current.value.length);
    };

    const loginHandler = () => {
        let usu = campoUser.current.value;
        let pass = campoPass.current.value;
        let datosLogin = {
            usuario: usu,
            password: pass
        };
        hacerLogin(datosLogin);
    };

    const hacerLogin = datosUsu => {
        fetch(URLBASE + 'login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsu)
        })
            .then(resp => {
                if (resp.status !== 200) /* throw "Algo salió mal" */;
                return resp.json();
            })
            .then(data => {
                if (data.mensaje !== undefined) {
                    toast.error(data.mensaje);
                } else {
                    iniciarSesion(data);
                    navigate("/dashboard");
                }
            })
    };

    const iniciarSesion = ({ id, apiKey }) => {
        dispatch(guardarSesionId(id));
        dispatch(guardarSesionToken(apiKey));
        localStorage.setItem("APPBebesToken", apiKey);
        localStorage.setItem("idUsuarioLogueado", id);
    };

    return (
        <div className="flex justify-center mt-12">
            <form className="flex flex-col items-center">
                <div className="mb-2 w-1/2">
                    <label htmlFor={usuario} className="block text-gray-700 text-sm font-medium mb-1">Usuario</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={campoUser} id={usuario} onChange={comprobarCampoUsuario} />
                </div>
                <div className="mb-3 w-1/2">
                    <label htmlFor={pass} className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                    <input type="password" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-transparente" ref={campoPass} id={pass} onChange={comprobarCampoPass} />
                </div>
                    <input type="button" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-1/4" value="Login" onClick={loginHandler} disabled={usuarioCampo === 0 || passCampo === 0} />
                    <Link to="/register" className="mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium">Registrarse</Link>
            </form>
        </div>
        
    );
}

export default LoginInputs;
