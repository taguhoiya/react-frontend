import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../components/header/ListItem";
import { Container } from "@mui/material";
import { AppBar, ToolBarModi } from "../components/header/AppBar";
import { DrawerStyle } from "../components/header/Drawer";
import { EachMovieCard } from "../components/cards/EachMovieCard";
import { useLocation } from "react-router-dom";
import { EachMarkCard } from "../components/cards/EachMarkCard";
import { useQuery } from "@apollo/client";
import { USER_INFO_TOP_PAGE } from "../graphql/queries";
import { Loader } from "../components/Loader";

export const drawerWidth = 220;
export const mdTheme = createTheme();

export const Dashboard = memo((props) => {
  const { num } = props;
  const location = useLocation().pathname;
  const { authState } = useContext(UserAuthContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const { loading ,data: dataU } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: authState.id },
  });
  if (loading) return <Loader state={true} />
  if (dataU)
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
        <Box
          component="main"
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {location === "/" && (
            <>
              <Container maxWidth="xl" sx={{ mt: 12, mb: 4, ml: 4 }}>
                <h1>HOT MOVIE</h1>
                <EachMovieCard num={num} dataU={dataU}/>
              </Container>
            </>
          )}
          {location.includes("movie") && (
            <>
              <Container maxWidth="xl" sx={{ mt: 12, mb: 4, ml: 4 }}>
                <h1>HOT MOVIE</h1>
                <EachMovieCard num={num} dataU={dataU}/>
              </Container>
            </>
          )}
          {location.includes("marks") && (
            <>
              <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
                <h1>HOT MARK</h1>
                <EachMarkCard num={num} dataU={dataU}/>
              </Container>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
});
