import React, { useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  Popper,
  Fade,
  Container,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    transform: "scale(1.2)",
    transition: "transform 0.3s ease-in-out",
  },
  width: 40,
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Footer = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  const locationAnchorRef = React.useRef(null);
  const socialAnchorRef = React.useRef(null);

  const handleLocationButtonClick = () => {
    setOpenLocation((prevOpen) => !prevOpen);
  };

  const handleSocialButtonClick = () => {
    setOpenSocial((prevOpen) => !prevOpen);
  };

  return (
    <AppBar
      component="footer"
      position="sticky"
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "white",
        py: 1,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            textAlign: "center",
          }}
        >
          <Typography variant="body2">Carlos Ma. Maggiolo 622</Typography>
          <Typography variant="body2">Montevideo - Uruguay</Typography>
          <Typography variant="body2">Celular: +598 98 661 655</Typography>
        </Box>

        <Box sx={{ display: { xs: "block", sm: "none" }, textAlign: "center" }}>
          <StyledIconButton
            ref={locationAnchorRef}
            onClick={handleLocationButtonClick}
            color="inherit"
          >
            <LocationOnIcon />
          </StyledIconButton>

          <Popper
            open={openLocation}
            anchorEl={locationAnchorRef.current}
            transition
            placement="top-start"
            sx={{ zIndex: 1500 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box
                  sx={{
                    padding: 2,
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: 1,
                    boxShadow: 3,
                    textAlign: "center",
                    width: "200px",
                  }}
                >
                  <Typography variant="body2">
                    Carlos Ma. Maggiolo 622
                  </Typography>
                  <Typography variant="body2">Montevideo - Uruguay</Typography>
                  <Typography variant="body2">
                    Celular: +598 98 661 655
                  </Typography>
                </Box>
              </Fade>
            )}
          </Popper>
        </Box>

        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body1">Centro Tiféret</Typography>
          <Typography variant="body1">
            Espacio de sanación e integración
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "block", sm: "none" }, textAlign: "center" }}>
          <StyledIconButton
            ref={socialAnchorRef}
            onClick={handleSocialButtonClick}
            color="inherit"
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FacebookIcon />
              <AddIcon sx={{ fontSize: 20 }} />
            </Box>
          </StyledIconButton>

          <Popper
            open={openSocial}
            anchorEl={socialAnchorRef.current}
            transition
            placement="top-end"
            sx={{ zIndex: 1500 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box
                  sx={{
                    padding: 2,
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: 1,
                    boxShadow: 3,
                    textAlign: "center",
                    width: "200px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: 2, justifyContent: "center" }}
                  >
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
              </Fade>
            )}
          </Popper>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: { xs: 1, sm: 2 },
            justifyContent: "center",
            textAlign: "center",
          }}
        >
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
      </Container>
    </AppBar>
  );
};

export default Footer;
