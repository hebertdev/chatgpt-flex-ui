//hooks
import { useChatState } from "@/hooks/useChatState";
import { useIsMobile } from "@/hooks/useIsMobile";

//components
import ModelParameters from "@/components/ModelParameters";
import { Messages, Form } from "@/components/Chat";

import { Box, Container } from "@mui/material";

export function HomeLogin() {
  const [chatState] = useChatState();
  const { showParameters } = chatState;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <Container
        disableGutters
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            padding: "0 10px",
            height: `calc(100vh - ${64}px)`,
            width: "100%",
          }}
        >
          <Messages />
          <Form />
        </Box>
      </Container>
      {!useIsMobile() && (
        <>
          {showParameters && (
            <Box
              sx={{
                width: "270px",
                padding: "10px",
              }}
            >
              <ModelParameters />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
