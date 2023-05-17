//hooks
import { useChatForm } from "@/hooks/useChatForm";
import { useTokenLength } from "@/hooks/useTokenLength";

//mui
import { Paper, InputBase, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export function Form() {
  const { handleChangeMessage, handleSubmitMessage, message, sendingMessage } =
    useChatForm();

  return (
    <>
      <small
        style={{
          textAlign: "center",
          display: "block",
          fontSize: "11px",
        }}
      >
        posible tokens:{useTokenLength({ message: message })}
      </small>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          marginTop: "5px",
          position: "relative",
        }}
        component="form"
        variant="outlined"
      >
        <InputBase
          sx={{ ml: 1, flex: 1, padding: "3px" }}
          placeholder={`Escribe algo...`}
          onChange={handleChangeMessage}
          value={message}
          multiline
          maxRows={6}
          inputProps={{
            onKeyPress: (event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmitMessage(event);
              }
            },
          }}
        />
        {sendingMessage ? (
          <IconButton type="button">
            <CircularProgress size="24px" />
          </IconButton>
        ) : (
          <IconButton type="button" onClick={handleSubmitMessage}>
            <SendIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        )}
      </Paper>
    </>
  );
}
