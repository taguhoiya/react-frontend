import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { drawerWidth } from "../../containers/DashBoard";
import { Divider, IconButton, Toolbar } from "@mui/material";
import { MainListItems, SecondaryListItems } from "./ListItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const DrawerStyle = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      backgroundColor: "#e6edf5",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
          height: "100%",
        },
      }),
    },
  })
);

export const Drawer = (props) => {
  return (
    <DrawerStyle variant="permanent" open={props.open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          backgroundColor: "#e6edf5",
        }}
      >
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <MainListItems to={props.profileUrl} />
      <Divider />
      <SecondaryListItems to={props.profileUrl} />
    </DrawerStyle>
  );
};
