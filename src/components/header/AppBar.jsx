import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { drawerWidth } from "../../containers/DashBoard";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { AuthHeaderButton } from "../Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "../../containers/auth/Logout";

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

export const ToolBarModi = (props) => {
  const { toggleDrawer, open, authState } = props;
  return (
    <>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
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
        {/* <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge color="secondary">
            <SearchIcon />
          </Badge>
        </IconButton> */}
        {authState.id === 0 ? (
          <>
            <AuthHeaderButton to="/register">Register</AuthHeaderButton>
            <AuthHeaderButton to="/login">Login</AuthHeaderButton>
          </>
        ) : (
          <>
            <Logout>Logout</Logout>
          </>
        )}
      </Toolbar>
    </>
  );
};
