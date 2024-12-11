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
import AdminPanel from "./components/adminPanel/AdminPanel";
import ProductFormPage from "./components/ecommerce/ProductFormPage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              <Route path="/store" element={<ProductPage />} />
              <Route path="/events" element={<Event />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/create-product" element={<ProductFormPage />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
