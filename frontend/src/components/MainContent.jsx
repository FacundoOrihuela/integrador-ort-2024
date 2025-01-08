import { Box } from "@mui/material";
import portadaImg from "../components/img/portrait.jpg";

const MainContent = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={portadaImg}
        alt="Yoga Session"
        sx={{ width: "100%", height: "100vh", objectFit: "cover" }}
      />
    </Box>
  );
};

export default MainContent;