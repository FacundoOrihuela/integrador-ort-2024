import './estilos.css'
import Login from './components/login/Login'
import Register from './components/Register'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Principal from './components/Principal'
import VerifyEmail from './components/VerifyEmail'
import ForgotPass from './components/ForgotPass'
import ResetPass from './components/ResetPass'
import Event from './components/event/Event'
import ProductList from './components/ProductList';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/forgotPassword" element={<ForgotPass />} />
            <Route path="/reset-password" element={<ResetPass />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/events" element={<Event />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </UserProvider>
  )
}

export default App
