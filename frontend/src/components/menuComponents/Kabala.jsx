import { Box, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import kabalaImage from "../img/kabala.jpg";
import kabalaVivaIImage from "../img/kabalaVivaI.jpg";
import kabalaVivaIIImage from "../img/kabalaVivaII.jpg";
import clasesKabalaImage from "../img/clasesKabala.jpg";
import sod22Image from "../img/sod22.jpg";
import kabalaPortraitImage from "../img/kabalaPortrait.jpg";
import KabalaVivaIDetails from "./Kabala/KabalaVivaIDetails";

const Kabala = () => {
  const [showDetails, setShowDetails] = useState(false);

  const articles = [
    {
      title: "Kabalá Viva I",
      description: "Esta propuesta ofrece un espacio en el que recorremos el Árbol de la Vida (Etz Jaim en hebreo) a lo largo de 10 encuentros. El trabajo incluye todas las dimensiones: física, emocional, mental y espiritual.",
      image: kabalaVivaIImage,
      detailsComponent: <KabalaVivaIDetails onBack={() => setShowDetails(false)} />,
    },
    {
      title: "Kabalá Viva II",
      description: "Con el mismo espíritu de Kabalá Viva I, experimentamos juntos la conciencia de unidad, recorriendo el Árbol de la Vida. En Kabalá Viva II, trabajamos con los senderos, las letras sagradas, los mundos, el nombre inefable y los niveles del alma.",
      image: kabalaVivaIIImage,
    },
    {
      title: "Clases de Kabalá",
      description: "La kabalá también llamada la mística judía, es un desarrollo espiritual donde se abarcan dos temas fundamentales: la creación del Universo y el alma humana. A través de la historia los grandes kabalistas de todos los tiempos nos han dejado un infinito manantial desde el cual veremos el desarrollo de estos dos temas que encierran los misterios universales.",
      image: clasesKabalaImage,
    },
    {
      title: "Sod 22",
      description: "Sod 22 Montevideo es un grupo de estudio de Kabalá coordinado por Centro Tiféret. Es un espacio autogestionado que funciona desde el espíritu de armonía que nos convoca, dentro del marco de la Red internacional Sod 22, propiciada por el Dr. Mario Sabán desde su Escuela de Psicología y Cabalá con sede en Barcelona.",
      image: sod22Image,
    },
  ];

  if (showDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: 2,
          backgroundImage: `url(${kabalaPortraitImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {articles[0].detailsComponent}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
        backgroundImage: `url(${kabalaPortraitImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ width: "70vh" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 2,
            borderRadius: 1,
            gap: 1,
          }}
        >
          <Box component="img" src={kabalaImage} alt="Kabalá" sx={{ width: 200, height: 200, borderRadius: "50%", marginRight: 4 }} />
          <Box>
            <Typography variant="h4">Kabalá Viva</Typography>
            <Typography>
              La Kabalá es un sistema milenario de acercamiento a la realidad, una hoja de ruta para incorporar sus enseñanzas en la vida cotidiana. Nos invita a transitar un sendero de crecimiento emocional, mental y espiritual, de una manera integral y totalizadora. Desde el año 2008 nuestra casa realiza grupos de crecimiento en base a esta sabiduría a través de una propuesta teórica y experiencial que lleva el nombre de Kabalá Viva.
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: 5,
                  borderRadius: 1,
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}>
                  <Box component="img" src={article.image} alt={article.title} sx={{ width: 100, height: 100, borderRadius: "50%", marginRight: 2 }} />
                  <Box>
                    <Typography variant="h6">{article.title}</Typography>
                    <Typography>{article.description}</Typography>
                  </Box>
                </Box>
                {article.title === "Kabalá Viva I" && (
                  <Box sx={{ marginTop: "auto" }}>
                    <Button variant="contained" color="secondary" fullWidth onClick={() => setShowDetails(true)}>
                      Más información
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Kabala;