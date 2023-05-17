import { useState, useEffect } from "react";

//hooks
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDarkModeContext } from "@/hooks/useDarkModeContext";

//header helpers
import { setStatus, getStatus } from "@/helpers/header";

//components
import { ButtonSettingParameters } from "./ButtonSettingsParameters";
import { DarkModeIcon, LightModeIcon } from "@/components/SvgIcons";

//mui
//import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import MuiDrawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MenuHeader } from "./MenuHeader";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    //width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderLogin() {
  const { theme, colorMode } = useDarkModeContext();
  const [open, setOpen] = useState(false);
  const [headerStyles, setHeaderStyle] = useState({
    background: "#090909",
    color: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  });
  useEffect(() => {
    setHeaderStyle({
      background: `${theme.palette.mode === "dark" ? "#090909" : "white"}`,
      color: "#090909",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    });
  }, [theme.palette.mode]);

  useEffect(() => {
    const initialStatus = getStatus();
    if (initialStatus) {
      setOpen(initialStatus === "open");
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setStatus("open");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setStatus("close");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ ...headerStyles }}
        elevation={0}
      >
        <Toolbar>
          {open ? (
            <IconButton
              onClick={handleDrawerClose}
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: 2,
                color: "text.primary",
              }}
            >
              {theme.direction === "rtl" ? (
                <MenuOpenOutlinedIcon />
              ) : (
                <MenuOpenOutlinedIcon />
              )}
            </IconButton>
          ) : (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                color: "text.primary",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap sx={{ color: "text.primary" }}>
              ChatGPT Flex
            </Typography>

            <Box>
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <SvgIcon
                    sx={{ color: "inherit" }}
                    component={LightModeIcon}
                  />
                ) : (
                  <SvgIcon sx={{ color: "inherit" }} component={DarkModeIcon} />
                )}
              </IconButton>
              <ButtonSettingParameters />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {useIsMobile() ? (
        <>
          <SwipeableDrawer
            disableSwipeToOpen={true}
            open={open}
            onOpen={handleDrawerOpen}
            onClose={handleDrawerClose}
            anchor="left"
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Box
              sx={{
                width: drawerWidth,
              }}
            >
              <MenuHeader open={open} closeDrawer={handleDrawerClose} />
            </Box>
          </SwipeableDrawer>
        </>
      ) : (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <MenuHeader open={open} />
        </Drawer>
      )}
    </Box>
  );
}
