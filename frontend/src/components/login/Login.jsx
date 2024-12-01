import { Navigate, useNavigate } from 'react-router-dom'
import LoginInputs from './LoginInputs'
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (window.localStorage.getItem("idUsuarioLogueado") !== null) navigate("/principal")
    }, [])
    return (
        <section className='container align-self-center' id="login">
            <LoginInputs />
        </section>
    )
}

export default Login