import { useState, useEffect } from "react";

//contexts
import { useDarkModeContext } from "@/hooks/useDarkModeContext";

//material UI
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  IconButton,
  Box,
  Typography,
  Container,
  SvgIcon,
  Link,
} from "@mui/material";

import { DarkModeIcon, LightModeIcon } from "@/components/SvgIcons";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

type Anchor = "top" | "left" | "bottom" | "right";

export default function HeaderGuest() {
  const { theme } = useDarkModeContext();
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

  return (
    <>
      <AppBar position="fixed" sx={headerStyles} elevation={0}>
        <Navbar />
      </AppBar>
    </>
  );
}

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMobileMenu({ ...mobileMenu, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            LinkComponent={"a"}
            href="https://github.com/hebertdev/chatgpt-flex-ui"
            target="_blank"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"GitHub"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            LinkComponent={"a"}
            href="https://hebertdev.net/en"
            target="_blank"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Website"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const NavLink = styled(Link)(() => ({
    fontSize: "14px",
    //color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const { theme, colorMode } = useDarkModeContext();

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon
            onClick={toggleDrawer("left", true)}
            sx={{
              color: "text.primary",
            }}
          />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Typography
            variant="h1"
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              color: "text.primary",
            }}
            component={"a"}
            href="/"
          >
            ChatGPT Flex
          </Typography>
        </Box>

        <NavbarLinksBox>
          <NavLink
            variant="body2"
            sx={{ color: "text.secondary" }}
            href="https://github.com/hebertdev/chatgpt-flex-ui"
            target="_blank"
          >
            GitHub
          </NavLink>
          <NavLink
            variant="body2"
            sx={{ color: "text.secondary" }}
            href="https://hebertdev.net/en"
            target="_blank"
          >
            Website
          </NavLink>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <SvgIcon sx={{ color: "inherit" }} component={LightModeIcon} />
          ) : (
            <SvgIcon sx={{ color: "inherit" }} component={DarkModeIcon} />
          )}
        </IconButton>
      </Box>
    </NavbarContainer>
  );
};
