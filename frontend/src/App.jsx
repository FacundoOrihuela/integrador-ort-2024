import "./estilos.css";
import Login from "./components/login/Login";
import Register from "./components/Register";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Principal from "./components/Principal";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import Event from "./components/event/Event";
import ProductPage from "./components/ecommerce/ProductPage";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import AdminPanel from "./components/adminPanel/AdminPanel";
import ProductFormPage from "./components/ecommerce/ProductFormPage";
import PurchaseHistory from "./components/PurchaseHistory";
import Checkout from "./components/ecommerce/Checkout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from './components/UserProfile';
import ProductDetail from './components/ecommerce/ProductDetail';
import ContactUs from "./components/ContactUs";
import AboutTiferet from "./components/AboutTiferet";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <Provider store={store}>
            <CartProvider>
              <FavoriteProvider>
                <Routes>
                  <Route path="/" element={<Principal />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/verifyEmail" element={<VerifyEmail />} />
                  <Route path="/forgotPassword" element={<ForgotPass />} />
                  <Route path="/reset-password" element={<ResetPass />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Rutas protegidas */}
                  <Route path="/store" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
                  <Route path="/actividades" element={<ProtectedRoute><Event /></ProtectedRoute>} />
                  {/* ----- */}
                  
                  <Route path="/admin-panel" element={<AdminPanel />} />
                  <Route path="/create-product" element={<ProductFormPage />} />
                  <Route path="/purchase-history" element={<PurchaseHistory />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile/:userId" element={<UserProfile />} />
                  <Route path="/product/detail/:id" element={<ProductDetail />} />

                  <Route path="/contact" element={<ContactUs/>} />
                  <Route path="/aboutTiferet" element={<AboutTiferet />} />

                </Routes>
                <ToastContainer />
              </FavoriteProvider>
            </CartProvider>
          </Provider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
