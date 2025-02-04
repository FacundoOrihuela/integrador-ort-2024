import { Box, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import kabalaImage from "../img/kabala.jpg";
import kabalaVivaIImage from "../img/kabalaVivaI.jpg";
import kabalaVivaIIImage from "../img/kabalaVivaII.jpg";
import clasesKabalaImage from "../img/clasesKabala.jpg";
import sod22Image from "../img/sod22.jpg";
import kabalaPortraitImage from "../img/kabalaPortrait.jpg";
import KabalaVivaIDetails from "./Kabala/KabalaVivaIDetails";
import Footer from "../Footer";
import Header from "../Header";

const Kabala = () => {
  const [showDetails, setShowDetails] = useState(false);

  const articles = [
    {
      title: "Kabalá Viva I",
      description:
        "Esta propuesta ofrece un espacio en el que recorremos el Árbol de la Vida (Etz Jaim en hebreo) a lo largo de 10 encuentros. El trabajo incluye todas las dimensiones: física, emocional, mental y espiritual.",
      image: kabalaVivaIImage,
      detailsComponent: <KabalaVivaIDetails onBack={() => setShowDetails(false)} />,
    },
    {
      title: "Kabalá Viva II",
      description:
        "Con el mismo espíritu de Kabalá Viva I, experimentamos juntos la conciencia de unidad, recorriendo el Árbol de la Vida. En Kabalá Viva II, trabajamos con los senderos, las letras sagradas, los mundos, el nombre inefable y los niveles del alma.",
      image: kabalaVivaIIImage,
    },
    {
      title: "Clases de Kabalá",
      description:
        "La kabalá también llamada la mística judía, es un desarrollo espiritual donde se abarcan dos temas fundamentales: la creación del Universo y el alma humana. A través de la historia los grandes kabalistas de todos los tiempos nos han dejado un infinito manantial desde el cual veremos el desarrollo de estos dos temas que encierran los misterios universales.",
      image: clasesKabalaImage,
    },
    {
      title: "Sod 22",
      description:
        "Sod 22 Montevideo es un grupo de estudio de Kabalá coordinado por Centro Tiféret. Es un espacio autogestionado que funciona desde el espíritu de armonía que nos convoca, dentro del marco de la Red internacional Sod 22, propiciada por el Dr. Mario Sabán desde su Escuela de Psicología y Cabalá con sede en Barcelona.",
      image: sod22Image,
    },
  ];

  if (showDetails) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${kabalaPortraitImage})` }}
      >
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          {articles[0].detailsComponent}
        </Box>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${kabalaPortraitImage})` }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box sx={{ width: "90%", maxWidth: 1200 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 4,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: 3,
              borderRadius: 2,
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              component="img"
              src={kabalaImage}
              alt="Kabalá"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                marginRight: { xs: 0, md: 2 },
                marginBottom: { xs: 2, sm: 0 },
              }}
            />
            <Box>
              <Typography variant="h4" gutterBottom>
                Kabalá Viva
              </Typography>
              <Typography>
                La Kabalá es un sistema milenario de acercamiento a la realidad,
                una hoja de ruta para incorporar sus enseñanzas en la vida
                cotidiana. Nos invita a transitar un sendero de crecimiento
                emocional, mental y espiritual, de una manera integral y
                totalizadora. Desde el año 2008 nuestra casa realiza grupos de
                crecimiento en base a esta sabiduría a través de una propuesta
                teórica y experiencial que lleva el nombre de Kabalá Viva.
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={5}>
            {articles.map((article, index) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(250, 250, 250, 0.95)",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                    padding: 5,
                    borderRadius: 3,
                    gap: 3,
                    height: "100%",
                    flexDirection: { xs: "column", sm: "row" }, // Apilar en móviles
                  }}
                >
                  <Box
                    component="img"
                    src={article.image}
                    alt={article.title}
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginBottom: { xs: 2, sm: 0 }, // Separar imagen en móviles
                    }}
                  />
                  <Box>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {article.description}
                    </Typography>
                    {article.title === "Kabalá Viva I" && (
                      <Box sx={{ marginTop: 3 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setShowDetails(true)}
                        >
                          Más información
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </motion.div>
  );
};

export default Kabala;
