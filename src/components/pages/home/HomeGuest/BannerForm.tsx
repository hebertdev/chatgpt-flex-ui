import { useState } from "react";

// services
import { verifyToken } from "@/services/openai";

//helpers
import { setToken, deleteToken } from "@/helpers/auth";

//context
import { useAlertContext } from "@/hooks/useAlertContext";

// material UI
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Link,
} from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

export function BannerForm() {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const { showAlert } = useAlertContext();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleOnSubmitKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiKey === "") return;
    try {
      setLoading(true);
      await verifyToken(apiKey);
      setApiKey("");
      setToken(apiKey);
      setLoading(false);
      showAlert("API key guardada", "success");
      window.location.reload();
    } catch (error: any) {
      setLoading(false);
      deleteToken();
      setApiKey("");
      if (error.response && error.response.status === 401) {
        // Error de autenticación (401 Unauthorized)
        showAlert("API key incorrecta", "error");
      } else if (error.response && error.response.status >= 500) {
        // Error de servidor (códigos de estado 5xx)
        showAlert("Error en el servidor", "error");
      } else {
        // Otros errores
        showAlert("Error en la solicitud", "error");
      }
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: "1px",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
        }}
        component="form"
        variant="outlined"
        onSubmit={handleOnSubmitKey}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, padding: "3px" }}
          placeholder={`Tu API Key`}
          onChange={handleChangeInput}
          value={apiKey}
          type="password"
          autoComplete="off"
        />

        {loading ? (
          <IconButton type="button">
            <CircularProgress size="20px" />
          </IconButton>
        ) : (
          <IconButton type="submit">
            <VpnKeyOutlinedIcon />
          </IconButton>
        )}
      </Paper>
      <Link
        href="https://platform.openai.com/account/api-keys"
        target="_blank"
        sx={{
          marginTop: "5px",
          display: "block",
          fontSize: "14px",
        }}
      >
        Obtenga su clave API de OpenAI
      </Link>
      <span
        style={{
          fontSize: "12px",
        }}
      >
        La clave API se almacena localmente en su navegador y nunca se envía a
        ningún otro lugar.
      </span>
    </>
  );
}
