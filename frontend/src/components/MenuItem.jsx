import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const MenuItem = ({ to, imgSrc, altText, text }) => {
  return (
    <Link to={to} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "all 0.3s",
          overflow: "hidden",
          "&:hover": {
            width: 270,
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
            width: 70,
            height: 70,
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