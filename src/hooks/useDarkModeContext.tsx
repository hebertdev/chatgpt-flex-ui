import { useContext } from "react";

//context
import {
  DarkModeContext,
  DarkModeContextProps,
} from "@/contexts/DarkModeContext";

export const useDarkModeContext = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};
