//hooks
import { useChatState } from "@/hooks/useChatState";

//components
import { ButtonInstallIos } from "../ButtonInstallIos";

//material UI
import { Box, Typography } from "@mui/material";

export function ModelInfo() {
  const [chatState] = useChatState();
  const { currentModel, currentChat } = chatState;

  return (
    <>
      {" "}
      {currentChat === null && (
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "600",
            }}
          >
            ChatGPT
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            Modelo: {currentModel.name}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {currentModel.description}
          </Typography>
          <br />
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {currentModel.helper}
          </Typography>
          <br />
          <ButtonInstallIos />
        </Box>
      )}
    </>
  );
}
