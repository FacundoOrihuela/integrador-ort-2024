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
          width: "4vw",
          height: "4vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "all 0.3s",
          overflow: "hidden",
          "&:hover": {
            width: "12vw",
            borderRadius: "25%",
          },
          "&:hover .menu-img": {
            position: "relative",
            left: 0,
            top: 0,
            transform: "none",
          },
          "&:hover .button-text": {
            opacity: 1,
            marginLeft: "0.5vw",
          },
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={altText}
          className="menu-img"
          sx={{
            width: "2vw",
            height: "2vw",
            borderRadius: "50%",
            position: "absolute",
          }}
        />
        <Typography
          sx={{
            ml: "0.2vw",
            color: "black",
            opacity: 0,
            whiteSpace: "nowrap",
            transition: "opacity 0.3s, margin-left 0.3s",
            fontSize: "0.8vw",
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
