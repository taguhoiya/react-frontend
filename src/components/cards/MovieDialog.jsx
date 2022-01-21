import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { memo } from "react";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const BootstrapDialogTitle = memo((props) => {
  const { children, onClose, releaseYear, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, display: "flex", minWidth: "40%" }} {...other}>
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
    </DialogTitle>
  );
});

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
