import { useEffect } from "react";

//contexts
import { useDarkModeContext } from "@/hooks/useDarkModeContext";

//auth helpers
import { getToken } from "@/helpers/auth";

//layous login and guest
import { LayoutGuest } from "./LayoutGuest";
import { LayoutLogin } from "./LayoutLogin";

//components
import AlertApp from "@/components/Alert";

//mui
import { Box, CssBaseline } from "@mui/material";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  const { theme } = useDarkModeContext();
  useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.mode === "light" ? "#f5f5f5" : "#222222";
  }, [theme.palette.background.default, theme.palette.mode]);

  return (
    <Box>
      <CssBaseline />
      <AlertApp />
      {getToken() ? (
        <LayoutLogin>{children}</LayoutLogin>
      ) : (
        <LayoutGuest>{children}</LayoutGuest>
      )}
    </Box>
  );
}
