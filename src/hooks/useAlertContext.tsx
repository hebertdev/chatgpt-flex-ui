import { useContext } from "react";

//context
import { AlertContext, AlertContextProps } from "@/contexts/AlertContext";

export const useAlertContext = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};
