import { Box, Typography, Button, Link } from "@mui/material";
import facilitadorasImage from "../../img/facilitadoras.jpg"; // Asegúrate de tener esta imagen en la carpeta correcta

const KabalaVivaIDetails = ({ onBack }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 10rem)", // Ajustar para que no quede debajo del header y el footer
        padding: 2,
        marginTop: 10,
      }}
    >
      <Box
        sx={{
          width: "70vh",
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 1,
          textAlign: "center",
          overflowY: "auto", // Habilitar el scroll vertical
        }}
      >
        <Typography variant="h4" gutterBottom>
          Kabalá Viva I
        </Typography>
        <Typography paragraph>
          A partir de la lectura de textos editados y seleccionados de Kabalá sobre las diez Sefirót (cualidades del alma), las integramos a nuestra vida cotidiana, haciendo pasar por nuestra propia experiencia aquello que leemos.
        </Typography>
        <Typography paragraph>
          Aportamos de este modo nuestra parte para hacer de éste, un mundo mejor. Luego, en el compartir grupal, fortalecemos el aprendizaje abriendo el corazón y ampliando la conciencia.
        </Typography>
        <Typography paragraph>
          Es un espacio de reencuentro con nuestra esencia profunda.
        </Typography>
        <Typography paragraph>
          Facilitan: Dafna Curiel y Graciela Epstein
        </Typography>
        <Typography paragraph>
          Contacto: <Link href="https://wa.me/59899651460" target="_blank" rel="noopener noreferrer">+598 99 651 460</Link>
        </Typography>
        <Box
          component="img"
          src={facilitadorasImage}
          alt="Dafna Curiel y Graciela Epstein"
          sx={{ width: 200, height: 200, borderRadius: "50%", marginBottom: 4, display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        <Typography paragraph sx={{ fontWeight: "bold" }}>
          Dafna Curiel y Graciela Epstein
        </Typography>
        <Typography paragraph>
          Creadoras y facilitadoras de los Grupos de Crecimiento inspirados en la Sabiduría de la Kabalá, desde el año 2008.
        </Typography>
        <Typography paragraph>
          A lo largo de nuestro camino de búsqueda personal, en el que incursionamos en diferentes culturas y visiones de mundo, encontramos mayor resonancia en la sabiduría de la Kabalá, y elegimos profundizar en ella, abrevando en nuestras raíces judías.
        </Typography>
        <Typography paragraph>
          La Kabalá es, para nosotras, un sistema milenario de acercamiento a la realidad de nuestro universo, y una hoja de ruta para incorporar sus enseñanzas en la vida cotidiana. Nos invita a transitar un sendero de crecimiento emocional, mental y espiritual, de una manera integral y totalizadora.
        </Typography>
        <Typography paragraph>
          Inspiradas en autores que proponen una visión universal y práctica de la Kabalá, nos surgió en el año 2008 la idea de crear un espacio grupal de “Crecimiento personal en base a la sabiduría de la Kabalá”, con un formato de 10 encuentros, en frecuencia mensual. Durante esta experiencia, proponemos una integración teórico-vivencial, a través de un recorrido por el Árbol de la Vida.
        </Typography>
        <Typography paragraph>
          En el transcurso de los años, los grupos fueron desarrollándose de diferentes maneras, y adaptándose a las necesidades que fueron surgiendo.
        </Typography>
        <Typography paragraph>
          Lo que en un principio fue un solo grupo (introductorio), terminó transformándose en distintos niveles de participación (profundización y exploración), integrando nuevas herramientas tales como: la danza circular sagrada, la música ancestral meditativa, la astrología y demás lenguajes simbólicos. También surgió la posibilidad de culminar el trabajo anual de cada grupo transitando físicamente el Árbol de la Vida en la naturaleza en “Auke”, un espacio en el departamento de Colonia, destinado a aunar distintas manifestaciones de la energía espiritual.
        </Typography>
        <Typography paragraph>
          A lo largo de todo este proceso, también fue cambiando su nombre y desde el 2019 lleva el nombre de Kabalá Viva.
        </Typography>
        <Button variant="contained" color="primary" onClick={onBack}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default KabalaVivaIDetails;
