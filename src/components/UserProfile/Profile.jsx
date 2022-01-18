import { useContext, useState } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Box, Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { mdTheme } from "../../containers/DashBoard";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../header/ListItem";
import { AppBar, ToolBarModi } from "../header/AppBar";
import { DrawerStyle } from "../header/Drawer";
import { Loader } from "../Loader";
import { GetImagePath } from "../providers/UserImageProvider";
import { TabsBasic } from "../UserProfile/Tabs";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "../../graphql/queries";
import defaultImage from "../../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";
import { EditProfile } from "../Button";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const { authState } = useContext(UserAuthContext);
  const path = GetImagePath();
  const uri = !path ? "" : `http://www.moview-ori.com/${path}/`;
  const profileUrl = ".";
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { id: parseInt(authState.id) },
    fetchPolicy: "cache-first",
  });
  if (authState.id === 0) {
    return <Navigate to="/login" />;
  }
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const { favorites, marks, clips, nickname } = data.publicUser;
    return (
      <>
        <Loader state={false} />
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} color="inherit">
              <ToolBarModi
                open={open}
                toggleDrawer={toggleDrawer}
                profileUrl={profileUrl}
                authState={authState}
              />
            </AppBar>
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
              <Divider />
              <MainListItems to={profileUrl} />
              <Divider />
              <SecondaryListItems to={profileUrl} />
            </DrawerStyle>
            <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
              <h1>{nickname}'s page</h1>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <img
                      src={!uri ? defaultImage : uri}
                      alt="icon"
                      height="150px"
                      width="150px"
                      style={{ borderRadius: "50%" }}
                    />
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item>
                    <EditProfile image={!uri ? defaultImage : uri}>Edit Profile</EditProfile>
                  </Grid>
                  <Grid item xs />
                  <Grid item xs={3} />
                </Grid>
                <TabsBasic data={{ favorites, marks, clips }} />
              </Box>
            </Container>
          </Box>
        </ThemeProvider>
      </>
    );
  }
};
