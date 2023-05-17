import { useState } from "react";

// Hooks
import { useChatState } from "@/hooks/useChatState";
import { useIsMobile } from "@/hooks/useIsMobile";

// Components
import ModelParameters from "@/components/ModelParameters";

// Material UI
import { IconButton, Menu, Box } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";

export function ButtonSettingParameters() {
  const [chatState, chatActions] = useChatState();
  const { showParameters } = chatState;
  const { toggleShowParameters } = chatActions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleShowParameters(!showParameters);
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleShowParameters(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <PsychologyIcon
          color={showParameters ? "primary" : undefined}
          sx={{
            fontSize: "30px",
          }}
        />
      </IconButton>
      {useIsMobile() && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Box
            sx={{
              padding: "0 20px",
            }}
          >
            <ModelParameters />
          </Box>
        </Menu>
      )}
    </>
  );
}
