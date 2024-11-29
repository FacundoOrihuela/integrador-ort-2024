import './estilos.css'
import Login from './componentes/Login/Login'
import Register from './componentes/Register'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './componentes/NoEncontrado'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Principal from './componentes/Principal'
import VerifyEmail from './componentes/VerifyEmail'
import ForgotPass from './componentes/ForgotPass'
import ResetPass from './componentes/ResetPass'
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/principal" element={<Principal/>} />
            <Route path="*" element={<NoEncontrado/>} />
            <Route path="/verifyEmail" element={<VerifyEmail/>} />
            <Route path="/forgotPassword" element={<ForgotPass/>} />
            <Route path="/reset-password" element={<ResetPass/>} />
            
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
