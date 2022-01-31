import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const SearchDialog = () => {
  const [openDia, setOpenDia] = useState(false);

  const handleClickOpen = () => {
    setOpenDia(true);
  };

  const handleClose = () => {
    setOpenDia(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ margin: 2, color: "#000000", borderRadius: "8px" }}
      >
        Movie
        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
      </Button>
      <Dialog open={openDia} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};
