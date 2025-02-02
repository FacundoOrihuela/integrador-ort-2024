import { Box } from "@mui/material";
import MenuItem from "./MenuItem";
import kabalaImg from "../components/img/kabala.png";
import meditarImg from "../components/img/meditar.png";
import circulosImg from "../components/img/circulos.png";
import integracionesImg from "../components/img/integraciones.png";
import psicoterapiaImg from "../components/img/psicoterapias.png";

const Menu = () => {
  return (
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
        marginLeft: 2,
      }}
    >
      <MenuItem to="/kabala" imgSrc={kabalaImg} altText="Escuela Kabalá Viva" text="Escuela Kabalá Viva" />
      <MenuItem to="/yoga" imgSrc={meditarImg} altText="Yoga y meditación" text="Yoga y meditación"/>
      <MenuItem to="/circulos" imgSrc={circulosImg} altText="Círculos de crecimiento" text="Círculos de crecimiento"/>
      <MenuItem to="/integraciones" imgSrc={integracionesImg} altText="Integraciones" text="Integraciones" />
      <MenuItem to="/psicoterapias" imgSrc={psicoterapiaImg} altText="Psicoterapia" text="Psicoterapia" />
    </Box>
  );
};

export default Menu;