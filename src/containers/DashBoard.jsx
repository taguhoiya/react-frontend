import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { AppBar, ToolBarModi } from "../components/headers/AppBar";
import { EachMovieCard } from "../components/cards/EachMovieCard";
import { useLocation, useParams } from "react-router-dom";
import { EachMarkCard } from "../components/cards/EachMarkCard";
import { useQuery } from "@apollo/client";
import { USER_INFO_TOP_PAGE } from "../graphql/queries";
import { Loader } from "../components/Loader";
import { DrawerModi } from "../components/headers/Drawer";

export const mdTheme = createTheme();

export const Dashboard = memo(() => {
  const num = parseInt(useParams().num);
  const location = useLocation().pathname;
  const { authState } = useContext(UserAuthContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const { loading, data: dataU } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: authState.id },
  });
  if (loading) return <Loader state={true} />;
  if (dataU)
    return (
      <>
        <Loader state={false} />
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <AppBar position="absolute" open={open} color="inherit">
              <ToolBarModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
            </AppBar>
            <DrawerModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
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
                    <EachMovieCard num={num} dataU={dataU} />
                  </Container>
                </>
              )}
              {location.includes("movie") && (
                <>
                  <Container maxWidth="xl" sx={{ mt: 12, mb: 4, ml: 4 }}>
                    <h1>HOT MOVIE</h1>
                    <EachMovieCard num={num} dataU={dataU} />
                  </Container>
                </>
              )}
              {location.includes("marks") && (
                <>
                  <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
                    <h1>HOT MARK</h1>
                    <EachMarkCard num={num} dataU={dataU} />
                  </Container>
                </>
              )}
            </Box>
          </Box>
        </ThemeProvider>
      </>
    );
});
