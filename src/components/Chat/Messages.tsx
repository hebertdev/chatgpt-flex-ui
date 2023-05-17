import { useRef, useEffect } from "react";

//hooks
import { useChatState } from "@/hooks/useChatState";
import { useChatForm } from "@/hooks/useChatForm";

//components
import { ModelInfo } from "./ModelInfo";
import { MessageLeft, MessageRight } from "./Message";

//mui
import { Box, Alert, Button } from "@mui/material";

export function Messages() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatState] = useChatState();
  const { currentChat, sendingMessage } = chatState;
  const { isError, handleSubmitMessage, handleResetMessage } = useChatForm();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const handleRetryMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmitMessage(e);
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: "10px",
        overflowY: "auto",
        height: "calc(100% - 90px)",
        "&::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "10px",
        },
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <ModelInfo />
      {currentChat?.messages.map((message, index) => {
        if (message.role === "assistant") {
          return (
            <MessageLeft
              key={index}
              message={message.content}
              displayName="C"
            />
          );
        } else {
          return <MessageRight key={index} message={message.content} />;
        }
      })}

      {isError === true && (
        <Box>
          <Alert
            severity="error"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Ocurrió un error
            <br />
            <Button
              color="info"
              size="small"
              variant="outlined"
              sx={{ marginRight: "5px" }}
              onClick={handleRetryMessage}
            >
              Reintentar
            </Button>
            <Button
              color="error"
              size="small"
              variant="outlined"
              onClick={handleResetMessage}
            >
              nuevo
            </Button>
          </Alert>
        </Box>
      )}

      {sendingMessage && <MessageLeft loader={true} />}
      <div ref={messagesEndRef} />
    </Box>
  );
}
