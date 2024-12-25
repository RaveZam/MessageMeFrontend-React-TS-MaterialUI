import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ResponsiveDialog: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen, setRegister }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setRegister(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Register Success!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Account Created, Please Procceed to the login page
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              mr: 2,
            }}
            onClick={handleClose}
            autoFocus
          >
            Procceed
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ResponsiveDialog;
