import { ButtonInstallIos } from "@/components/ButtonInstallIos";
// mui
import { Box, styled, Typography, Container } from "@mui/material";
import { BannerForm } from "./BannerForm";
import banner_img from "@/assets/bannner.webp";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(5),
  width: "100%",
  height: "100vh",
  overflow: "clip",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    height: "auto",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "50px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "35px",
    marginTop: "100px",
  },
}));

export const Banner = () => {
  return (
    <Container>
      <CustomBox>
        <Box sx={{ flex: "1" }}>
          <Title variant="h1">UI Open Source para la API Key de ChatGPT</Title>
          <Typography variant="body2" sx={{ fontSize: "18px", my: 4 }}>
            Usa nuestra UI Open Source y accede a las versiones GPT3 y GPT4 a
            bajo costo. Almacena tu clave localmente para mayor seguridad y paga
            por mensaje en lugar de una suscripción mensual. ¡Experimenta hoy
            mismo con ChatGPT!
          </Typography>
          <BannerForm />
        </Box>
        <Box
          sx={{
            flex: "1", //after
            position: "relative",
            "&::before": {
              content: "''",
              position: "absolute",
              width: "300px",
              height: "400px",
              display: "block",
              transition: "all 0.3s ease",
              borderRadius: "100%",
              background: "rgb(111 207 181)",
              opacity: "0.35",
              top: "8%",
              left: "10%",
              filter: "blur(72px)",
            },
          }}
        >
          <img
            src={banner_img}
            alt="heroImg"
            style={{
              maxWidth: "100%",
              position: "relative",
              zIndex: "1",
            }}
          />
          <ButtonInstallIos />
        </Box>
      </CustomBox>
    </Container>
  );
};
