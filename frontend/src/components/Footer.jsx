import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1">Carlos Ma. Maggiolo 622</Typography>
        <Typography variant="body1">Montevideo - Uruguay</Typography>
        <Typography variant="body1">Celular: +598 98 661 655</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1">Centro Tiféret</Typography>
        <Typography variant="body1">Espacio de sanación e integración</Typography>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <IconButton
          component="a"
          href="https://www.instagram.com/centrotiferet/"
          target="_blank"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="http://www.facebook.com/centrotiferet"
          target="_blank"
          color="inherit"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://api.whatsapp.com/send/?phone=59898661655&text&type=phone_number&app_absent=0"
          target="_blank"
          color="inherit"
        >
          <WhatsAppIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
