import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import MediaQuery from "react-responsive";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

export const BootstrapDialogTitle = memo((props) => {
  const { children, onClose, releaseYear, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, display: "flex", minWidth: "40%" }} {...other}>
      <MediaQuery query="(max-width: 550px)">
        <Typography variant="subtitle2" sx={{ mr: 8, alignItems: "flex-start" }}>
          {children}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon fontSize="small"/>
          </IconButton>
        ) : null}
        <Typography fontSize="0.6rem" sx={{ mt: 0.5, alignItems: "flex-end" }}>
          Released in {releaseYear}
        </Typography>
      </MediaQuery>
      <MediaQuery query="(min-width: 550px)">
        <Typography variant="h5" sx={{ pr: 2 }}>
          {children}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        <Typography variant="body1" sx={{ pt: 1, alignItems: "flex-end" }}>
          Released in {releaseYear}
        </Typography>
      </MediaQuery>
    </DialogTitle>
  );
});
