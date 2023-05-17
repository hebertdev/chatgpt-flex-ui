import { createContext, useState } from "react";

type AlertType = "error" | "warning" | "info" | "success";

export interface AlertContextProps {
  alertMessage: string;
  alertType: AlertType;
  isOpen: boolean;
  showAlert: (message: string, type: AlertType) => void;
  closeAlert: () => void;
}

interface AlertProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AlertContext = createContext({} as AlertContextProps);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("info");
  const [isOpen, setIsOpen] = useState(false);

  const showAlert = (message: string, type: AlertType) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider
      value={{
        alertMessage,
        alertType,
        isOpen,
        showAlert,
        closeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
