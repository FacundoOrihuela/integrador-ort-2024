import React from "react";
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <footer className="bg-colors-1 text-white py-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Centro Tiféret. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-3">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
