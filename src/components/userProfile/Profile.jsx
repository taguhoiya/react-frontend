import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Avatar, Box, Container, Grid, ThemeProvider } from "@mui/material";
import { mdTheme } from "../../containers/DashBoard";
import { AppBar, ToolBarModi } from "../headers/AppBar";
import { TabsBasic } from "./Tabs";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "../../graphql/queries";
import defaultImage from "../../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";
import { EditProfile } from "../Button";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader";
import { DrawerModi } from "../headers/Drawer";
import MediaQuery from "react-responsive";

export const Profile = memo(() => {
  const { authState } = useContext(UserAuthContext);
  const params = useParams().userId;
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { id: parseInt(params) },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const user = data.publicUser;
    const { favorites, marks, clips, nickname } = user;
    const uri = !user.path ? "" : `https://www.moview-ori.com${user.path}`;
    const src = !uri.includes("https") ? defaultImage : uri;
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
                      <EditProfile
                        params={params}
                        userId={authState.id}
                        image={src}
                        nickname={nickname}
                      >
                        Edit Profile
                      </EditProfile>
                    </Grid>
                    <Grid item xs />
                    <Grid item xs={3} />
                  </Grid>
                  <TabsBasic data={{ favorites, marks, clips }} />
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
                      <EditProfile
                        params={params}
                        userId={authState.id}
                        image={src}
                        nickname={nickname}
                      >
                        Edit Profile
                      </EditProfile>
                    </Grid>
                    <Grid item xs />
                    <Grid item xs={3} />
                  </Grid>
                  <TabsBasic data={{ favorites, marks, clips }} />
                </Box>
              </MediaQuery>
            </Container>
          </Box>
        </ThemeProvider>
      </>
    );
  }
});
