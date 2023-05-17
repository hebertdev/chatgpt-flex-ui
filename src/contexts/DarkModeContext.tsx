import { createContext, useState, useMemo, useEffect, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepOrange, teal } from "@mui/material/colors";

type PaletteMode = "light" | "dark";

const APPTHEME = "theme";
let current_theme: PaletteMode = "light";

export interface DarkModeContextProps {
  mode: PaletteMode;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: any; //definir un tipo más preciso para el tema si es necesario
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext({} as DarkModeContextProps); //TODO: definir tipo

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(current_theme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(APPTHEME);
    if (storedTheme === "light" || storedTheme === "dark") {
      setMode(storedTheme as PaletteMode);
      current_theme = storedTheme as PaletteMode;
    } else {
      setMode("light");
      current_theme = "light";
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
        if (current_theme === "light") {
          current_theme = "dark";
          window.localStorage.setItem(APPTHEME, current_theme);
        } else {
          current_theme = "light";
          window.localStorage.setItem(APPTHEME, current_theme);
        }
      },
    }),
    []
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: teal[700],
      },
      secondary: {
        main: deepOrange[600],
      },
      mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={{ mode, setMode, colorMode, theme }}>
        {children}
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}
