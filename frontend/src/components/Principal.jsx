import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import portadaImg from "../components/img/Portada.png";
import kabalaImg from "../components/img/kabala.png";
import meditarImg from "../components/img/meditar.png";
import circulosImg from "../components/img/circulos.png";
import integracionesImg from "../components/img/integraciones.png";
import psicoterapiaImg from "../components/img/psicoterapias.png";

const Principal = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            position: "fixed",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            zIndex: 50,
          }}
        >
          <Link
            to="/kabala"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:hover .button-text": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={kabalaImg}
                alt="Escuela Kabalá Viva"
                style={{ width: "70%", height: "70%", borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  ml: 2,
                  color: "white",
                  position: "absolute",
                  left: "110%",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="button-text"
              >
                Escuela Kabalá Viva
              </Typography>
            </Box>
          </Link>

          <Link
            to="/yoga"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:hover .button-text": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={circulosImg}
                alt="Bienestar corporal"
                style={{ width: "70%", height: "70%", borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  ml: 2,
                  color: "white",
                  position: "absolute",
                  left: "110%",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="button-text"
              >
                Círculos de crecimiento
              </Typography>
            </Box>
          </Link>

          <Link
            to="/circulos"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:hover .button-text": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={meditarImg}
                alt="Círculos de crecimiento"
                style={{ width: "70%", height: "70%", borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  ml: 2,
                  color: "white",
                  position: "absolute",
                  left: "110%",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="button-text"
              >
                Bienestar corporal
              </Typography>
            </Box>
          </Link>

          <Link
            to="/integraciones"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:hover .button-text": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={integracionesImg}
                alt="Abordajes holísticos"
                style={{ width: "70%", height: "70%", borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  ml: 2,
                  color: "white",
                  position: "absolute",
                  left: "110%",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="button-text"
              >
                Abordajes holísticos
              </Typography>
            </Box>
          </Link>

          <Link
            to="/psicoterapias"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:hover .button-text": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={psicoterapiaImg}
                alt="Psicoterapia"
                style={{ width: "70%", height: "70%", borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  ml: 2,
                  color: "white",
                  position: "absolute",
                  left: "110%",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="button-text"
              >
                Psicoterapia
              </Typography>
            </Box>
          </Link>

          <Link
            to="/consultorios"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:hover .button-text": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={psicoterapiaImg}
                alt="Consultorios"
                style={{ width: "70%", height: "70%", borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  ml: 2,
                  color: "white",
                  position: "absolute",
                  left: "110%",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="button-text"
              >
                Consultorios
              </Typography>
            </Box>
          </Link>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={portadaImg}
            alt="Yoga Session"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Principal;
