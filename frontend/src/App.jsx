import './estilos.css'
import Login from './componentes/Login'
import Register from './componentes/Register'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './componentes/NoEncontrado'
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NoEncontrado/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
