import React from "react";

//hooks
import { useDarkModeContext } from "@/hooks/useDarkModeContext";

//components
import { Loader } from "./Loader";
import { TextToCode } from "./TextToCode";

//material UI
import { styled, Box, Avatar } from "@mui/material";

//assets
import logo_chat from "@/assets/logo-min.png";

const AvatarMUI = styled(Avatar)(({ theme }) => ({
  //color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: "var(--colorVerde)",
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

interface MessageLeftProps {
  message?: string;
  displayName?: string;
  loader?: boolean;
}

export const MessageLeft: React.FC<MessageLeftProps> = ({
  message = "no message",
  displayName = "CHATGPT",
  loader,
}) => {
  const { theme } = useDarkModeContext();
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <AvatarMUI alt={displayName} src={logo_chat}></AvatarMUI>
        <Box
          sx={{
            width: "auto",
            boxSizing: "border-box",
            padding: " 0",
            display: "inline-grid",
          }}
        >
          <Box
            sx={{
              position: "relative",
              marginLeft: "5px",
              marginBottom: "10px",
              padding: "10px",
              bgcolor: `${
                theme.palette.mode === "light" ? "white" : "#090909"
              }`,
              textAlign: "left",

              border: `${
                theme.palette.mode === "light"
                  ? "1px solid rgba(0,0,0,.05)"
                  : "1px solid rgba(255,255,255,.05)"
              }`,
              borderRadius: "15px",
              width: "100%",
              overflow: "auto",
            }}
          >
            {loader ? (
              <Loader />
            ) : (
              <Box
                sx={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  fontSize: "14px",
                }}
              >
                <TextToCode text={message} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

interface MessageRightProps {
  message?: string;
}

export const MessageRight: React.FC<MessageRightProps> = ({
  message = "no message",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginBottom: "10px",
          padding: "10px",
          //backgroundColor: "#e8f4e8",
          backgroundColor: "#75ab9d",
          color: "white",
          // width: "70%",
          marginLeft: "40px",
          textAlign: "left",
          font: "400 .9em 'Open Sans', sans-serif",
          border: "1px solid rgba(0,0,0,.05)",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            fontSize: "14px",
          }}
        >
          {message}
        </Box>
      </Box>
    </Box>
  );
};
