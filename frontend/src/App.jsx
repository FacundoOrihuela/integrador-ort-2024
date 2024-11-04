import './estilos.css'
import Login from './componentes/Login'
import Register from './componentes/Register'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './componentes/NoEncontrado'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Principal from './componentes/Principal'
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
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
