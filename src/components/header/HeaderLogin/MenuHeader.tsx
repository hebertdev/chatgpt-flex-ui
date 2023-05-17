//hooks
import { useChatState } from "@/hooks/useChatState";
import { useIsMobile } from "@/hooks/useIsMobile";

//helpers
import { deleteToken } from "@/helpers/auth";

//components
import { MenuItem } from "./MenuItem";

//mui
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Button,
  Box,
  IconButton,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  open: boolean;
  closeDrawer?: () => void;
}

export function MenuHeader({ open, closeDrawer }: Props) {
  const [chatState, chatActions] = useChatState();

  const { sendingMessage, chats, currentChat } = chatState;
  const { addNewChat } = chatActions;

  const isMobile = useIsMobile();

  const handleNewChat = () => {
    addNewChat();
    if (isMobile && closeDrawer) {
      closeDrawer();
    }
  };

  const disableButtons = chats.length === 0 || !currentChat || sendingMessage;

  const handleDeleteToken = () => {
    deleteToken();
    window.location.reload();
  };

  return (
    <>
      <Divider />
      <Box
        sx={{
          padding: "10px",
          height: "60px",
        }}
      >
        {open ? (
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleNewChat}
            disabled={disableButtons}
          >
            nuevo chat
          </Button>
        ) : (
          <IconButton onClick={handleNewChat} disabled={disableButtons}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 220px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <List>
          {chats?.map((chat) => (
            <MenuItem key={chat.id} open={open} chat={chat} />
          ))}
        </List>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={handleDeleteToken}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Cerrar sesión"}
              secondary={"Eliminará tu API Key local."}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
