import { useState, useEffect } from "react";

//services
import { generateTitleForChat } from "@/services/openai";

//hooks
import { useChatState } from "@/hooks/useChatState";
import { useIsMobile } from "@/hooks/useIsMobile";

//mui
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Avatar,
  Typography,
} from "@mui/material";

//assets
import logo_chat from "@/assets/logo-min.png";
import { Chat } from "@/interfaces/chatState";

interface Props {
  chat: Chat;
  closeDrawer?: () => void;
  open: boolean;
}

export function MenuItem({ chat, closeDrawer, open }: Props) {
  const [chatState, chatActions] = useChatState();
  const { currentChat, sendingMessage } = chatState;
  const [title, setTitle] = useState("");
  const [withTitle, setWithTitle] = useState(false);

  const isMobile = useIsMobile();

  const { addCurrentChat } = chatActions;

  const handleChangeCurrentChat = (chat: Chat) => {
    if (sendingMessage) return;
    addCurrentChat(chat);
    if (isMobile && closeDrawer) {
      closeDrawer();
    }
  };

  useEffect(() => {
    setTitle(
      chat.messages[0].content.length > 25
        ? chat.messages[0].content.slice(0, 25) + "..."
        : chat.messages[0].content
    );
  }, []);

  const handleGenerateTitleChat = async () => {
    try {
      const messages = chat.messages.slice(0, 2);
      const data = await generateTitleForChat({
        messages: JSON.stringify(messages),
      });
      setTitle(data.data.choices[0].text!.trim());
    } catch (error) {
      setTitle(
        chat.messages[0].content.length > 25
          ? chat.messages[0].content.slice(0, 25) + "..."
          : chat.messages[0].content
      );
    }
  };

  useEffect(() => {
    if (!withTitle) {
      if (chat.messages.length > 1) {
        handleGenerateTitleChat();
        setWithTitle(true);
      }
    }
  }, [chat, withTitle]);

  return (
    <>
      <ListItem
        key={chat.id}
        disablePadding
        sx={{
          display: "block",
          background: `${
            currentChat?.id === chat?.id ? "var(--colorVerde)" : ""
          }`,
        }}
      >
        <ListItemButton
          sx={{
            justifyContent: open ? "initial" : "center",
          }}
          onClick={() => handleChangeCurrentChat(chat)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
            }}
          >
            <Avatar src={logo_chat} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: "14px",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {open ? `${title}` : `h`}
              </Typography>
            }
            secondary={chat.model.name}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
