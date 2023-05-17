import { useState } from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import installios from "@/assets/installios.jpg";

export function ButtonInstallIos(): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const isAppleDevice = /Mac|iPhone|iPod|iPad/.test(navigator.userAgent);

  if (!isAppleDevice) {
    return null;
  }
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          display: "block",
          margin: "auto",
        }}
        onClick={handleOpenModal}
      >
        Instalar en Ios
      </Button>
      <br />
      <br />
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogContent>
          <Typography sx={{ textAlign: "center" }}>
            Instalar en Ios - Safari
          </Typography>
          <img
            src={installios}
            alt="btn install Ios"
            style={{
              width: "250px",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
