import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    transform: "scale(1.2)",
    transition: "transform 0.3s ease-in-out",
  },
}));

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        position: "relative",
        zIndex: 1,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "white",
        gap: 10,
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: 1 }}>
        <Typography variant="body1">Carlos Ma. Maggiolo 622</Typography>
        <Typography variant="body1">Montevideo - Uruguay</Typography>
        <Typography variant="body1">Celular: +598 98 661 655</Typography>
      </Box>
      <Box sx={{ textAlign: "center", marginBottom: 1 }}>
        <Typography variant="body1">Centro Tiféret</Typography>
        <Typography variant="body1">Espacio de sanación e integración</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <StyledIconButton
          component="a"
          href="https://www.instagram.com/centrotiferet/"
          target="_blank"
          color="inherit"
        >
          <InstagramIcon />
        </StyledIconButton>
        <StyledIconButton
          component="a"
          href="http://www.facebook.com/centrotiferet"
          target="_blank"
          color="inherit"
        >
          <FacebookIcon />
        </StyledIconButton>
        <StyledIconButton
          component="a"
          href="https://api.whatsapp.com/send/?phone=59898661655&text&type=phone_number&app_absent=0"
          target="_blank"
          color="inherit"
        >
          <WhatsAppIcon />
        </StyledIconButton>
      </Box>
    </Box>
  );
};

export default Footer;
