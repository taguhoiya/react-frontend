import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Avatar, Box, Container, Grid, ThemeProvider } from "@mui/material";
import { mdTheme } from "./DashBoard";
import { AppBar, ToolBarModi } from "../components/headers/AppBar";
import { TabsBasic } from "../components/userProfile/Tabs";
import { EditProfile } from "../components/accessories/Button";
import { Loader } from "../components/accessories/Loader";
import { DrawerModi } from "../components/headers/Drawer";
import MediaQuery from "react-responsive";
import { UserInfoContext } from "../components/providers/UserInfoProvider";

export const Profile = memo(() => {
  const { authState } = useContext(UserAuthContext);
  const { nickname, src } = useContext(UserInfoContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  return (
    <>
      <Loader state={false} />
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <AppBar position="absolute" open={open} color="inherit">
            <ToolBarModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
          </AppBar>
          <DrawerModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
          <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <MediaQuery query="(max-width: 768px)">
              <h4>{nickname}'s page</h4>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Avatar
                      sx={{ width: 90, height: 90, marginRight: 3 }}
                      alt="my image"
                      src={src}
                    />
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item>
                    <EditProfile />
                  </Grid>
                  <Grid item xs />
                  <Grid item xs={3} />
                </Grid>
                <TabsBasic />
              </Box>
            </MediaQuery>
            <MediaQuery query="(min-width: 768px)">
              <h2>{nickname}'s page</h2>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Avatar
                      sx={{ width: 120, height: 120, marginRight: 2, marginBottom: 0.5 }}
                      alt="my image"
                      src={src}
                    />
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item>
                    <EditProfile />
                  </Grid>
                  <Grid item xs />
                  <Grid item xs={3} />
                </Grid>
                <TabsBasic />
              </Box>
            </MediaQuery>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
});
