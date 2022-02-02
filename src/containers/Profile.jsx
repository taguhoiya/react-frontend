import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Avatar, Box, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { mdTheme } from "./DashBoard";
import { AppBar, ToolBarModi } from "../components/headers/AppBar";
import { TabsBasic } from "../components/userProfile/Tabs";
import { EditProfile, FollowButton } from "../components/accessories/Button";
import { Loader } from "../components/accessories/Loader";
import { DrawerModi } from "../components/headers/Drawer";
import MediaQuery from "react-responsive";
import { UserInfoContext } from "../components/providers/UserInfoProvider";

export const Profile = memo(() => {
  const { authState } = useContext(UserAuthContext);
  const { user, nickname, src, followerUser, followingUser, selfIntro, params } =
    useContext(UserInfoContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  return (
    <>
      <Loader state={false} />
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex", backgroundColor: "#f0ecec" }}>
          <AppBar position="absolute" open={open} color="inherit">
            <ToolBarModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
          </AppBar>
          <DrawerModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
          <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <MediaQuery query="(max-width: 768px)">
              <Box>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={4}
                    sx={{ display: "flex", justifyContent: "center", ml: 2 }}
                  >
                    <Avatar sx={{ width: 110, height: 110, my: 0.5 }} alt="my image" src={src} />
                  </Grid>
                  <Grid item md={4} xs={6} sx={{ ml: 1 }}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: "bold", mb: 1 }} fontSize={16}>
                        {nickname}
                      </Typography>
                      {authState.id == params ? <EditProfile /> : <FollowButton user={user} />}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                      <Grid container justifyContent="center">
                        <Typography sx={{ ml: 1, fontWeight: "bold" }} fontSize={16}>
                          {followerUser.length}
                        </Typography>

                        <Typography sx={{ ml: 0.7 }} fontSize={12}>
                          followers
                        </Typography>
                      </Grid>
                      <Grid container justifyContent="center">
                        <Typography sx={{ ml: 1.5, fontWeight: "bold" }} fontSize={16}>
                          {followingUser.length}
                        </Typography>
                        <Typography sx={{ ml: 0.7 }} fontSize={12}>
                          following
                        </Typography>
                      </Grid>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        minHeight: 35,
                        maxHeight: 55,
                        mt: 0.5,
                      }}
                    >
                      <Typography fontSize={12}>{selfIntro}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <TabsBasic />
              </Box>
            </MediaQuery>
            <MediaQuery query="(min-width: 768px)">
              <Box>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Grid
                    item
                    lg={3.5}
                    xs={3}
                    sx={{ display: "flex", justifyContent: "center", mr: 2 }}
                  >
                    <Avatar
                      sx={{ width: 140, height: 140, mb: 0.5, alignItems: "center" }}
                      alt="my image"
                      src={src}
                    />
                  </Grid>
                  <Grid item lg={3.5} md={4} xs={3} sx={{ ml: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "left" }}>
                      <Typography sx={{ mr: 4, fontWeight: "bold" }} fontSize={22}>
                        {nickname}
                      </Typography>
                      {authState.id == params ? <EditProfile /> : <FollowButton user={user} />}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "left", my: 0.7 }}>
                      <Typography sx={{ ml: 2, fontWeight: "bold" }} fontSize={18}>
                        {followerUser.length}
                      </Typography>
                      <Box sx={{ ml: 0.7, mt: 0.4 }}>followers</Box>
                      <Typography sx={{ ml: 2, fontWeight: "bold" }} fontSize={18}>
                        {followingUser.length}
                      </Typography>
                      <Box sx={{ ml: 0.7, mt: 0.4 }}>following</Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "left", minHeight: 30, maxHeight: 70 }}
                    >
                      <Typography fontSize={15}>{selfIntro}</Typography>
                    </Box>
                  </Grid>
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
