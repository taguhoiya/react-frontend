import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Box, Divider, IconButton, Toolbar } from "@mui/material";
import { MainListItems, SecondaryListItems } from "./ListItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { memo } from "react";

export const drawerWidth = 200;

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
          minHeight: "100vh",
        },
      }),
    },
  })
);

export const DrawerModi = memo((props) => {
  const { open, toggleDrawer, profileUrl } = props;
  return (
    <DrawerStyle variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ minHeight: "100vh" }}>
        <Divider />
        <MainListItems to={profileUrl} />
        <Divider />
        <SecondaryListItems to={profileUrl} />
      </Box>
    </DrawerStyle>
  );
});
