//components
import HeaderLogin from "@/components/header/HeaderLogin";
import { DrawerHeader } from "@/components/header/HeaderLogin";

//mui
import { Box, CssBaseline } from "@mui/material";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export function LayoutLogin({ children }: Props) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          color: "text.primary",
          overflow: "auto",
          height: "100vh !important",
        }}
      >
        <CssBaseline />
        <HeaderLogin />
        <Box
          component="main"
          sx={{
            maxWidth: "100%",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <DrawerHeader />
          <Box>{children}</Box>
        </Box>
      </Box>
    </>
  );
}
