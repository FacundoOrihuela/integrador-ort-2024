import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const MenuItem = ({ to, imgSrc, altText, text }) => {
  return (
    <Link to={to} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <Box
        sx={{
          width: "6rem", // Ajustado a unidades rem
          height: "6rem", // Ajustado a unidades rem
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "all 0.3s",
          overflow: "hidden",
          "&:hover": {
            width: "16rem", // Ajustado a unidades rem
            borderRadius: "25px",
          },
          "&:hover .menu-img": {
            position: "relative",
            left: 0,
            top: 0,
            transform: "none",
          },
          "&:hover .button-text": {
            opacity: 1,
            marginLeft: 2,
          },
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={altText}
          className="menu-img"
          sx={{
            width: "4rem", // Ajustado a unidades rem
            height: "4rem", // Ajustado a unidades rem
            borderRadius: "50%",
            position: "absolute",
          }}
        />
        <Typography
          sx={{
            ml: 2,
            color: "black",
            opacity: 0,
            whiteSpace: "nowrap",
            transition: "opacity 0.3s, margin-left 0.3s",
          }}
          className="button-text"
        >
          {text}
        </Typography>
      </Box>
    </Link>
  );
};

export default MenuItem;