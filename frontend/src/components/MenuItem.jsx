import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const MenuItem = ({ to, imgSrc, altText, text }) => {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          width: { xs: "16vw", sm: "8vw", md: "5vw" },
          height: { xs: "16vw", sm: "8vw", md: "5vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "all 0.3s",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            width: { xs: "45vw", sm: "45vw", md: "20vw" },
            borderRadius: "5%",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)",
          },
          "&:hover .menu-img": {
            position: "relative",
            left: 0,
            top: 0,
            transform: "scale(1.1)",
          },
          "&:hover .button-text": {
            opacity: 1,
            marginLeft: "0.5vw",
            transform: "translateX(5px)",
          },
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={altText}
          className="menu-img"
          sx={{
            width: { xs: "8vw", sm: "5vw", md: "3vw" },
            height: { xs: "8vw", sm: "5vw", md: "3vw" },
            borderRadius: "50%",
            position: "absolute",
            transition: "transform 0.3s ease", 
          }}
        />
        <Typography
          sx={{
            ml: { xs: "1.5vw", sm: "0.8vw", md: "0.5vw" },
            color: "black",
            opacity: 0,
            whiteSpace: "nowrap",
            transition: "opacity 0.3s, margin-left 0.3s, transform 0.3s",
            fontSize: { xs: "3vw", sm: "1.8vw", md: "1.2vw" },
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
