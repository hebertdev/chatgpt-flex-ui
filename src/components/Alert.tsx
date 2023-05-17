import { useAlertContext } from "@/hooks/useAlertContext";
import { Snackbar, Alert } from "@mui/material";

export default function AlertApp() {
  const { alertMessage, alertType, isOpen, closeAlert } = useAlertContext();

  if (!alertMessage) {
    return null;
  }

  const handleClose = () => {
    closeAlert();
  };

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert variant="filled" onClose={handleClose} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
