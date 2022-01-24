import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "../../containers/Logout";
import { memo } from "react";
import { drawerWidth } from "./Drawer";

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const ToolBarModi = memo((props) => {
  const { toggleDrawer, open } = props;
  //   <IconButton color="inherit">
  //   <Badge badgeContent={4} color="secondary">
  //     <NotificationsIcon />
  //   </Badge>
  // </IconButton>
  // <IconButton color="inherit">
  //   <Badge color="secondary">
  //     <SearchIcon />
  //   </Badge>
  // </IconButton>
  return (
    <>
      <Toolbar
        sx={{
          pr: "24px",
          backgroundColor: "#e6edf5",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Moview
        </Typography>
        <Logout />
      </Toolbar>
    </>
  );
});
