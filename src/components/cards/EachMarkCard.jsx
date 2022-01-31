import { useQuery } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import { MARK_PAGES } from "../../graphql/queries";
import { Loader } from "../accessories/Loader";
import { DashBoardContext } from "../providers/DashBoardProvider";
import { GetMovie } from "./GetMovie";
import { DrawerModi } from "../../components/headers/Drawer";
import { AppBar, ToolBarModi } from "../../components/headers/AppBar";
import { UserAuthContext } from "../providers/UserAuthProvider";

export const EachMarkCard = memo((props) => {
  const { num } = props;
  const { dataU } = useContext(DashBoardContext);
  const { authState } = useContext(UserAuthContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const [params, setParams] = useState("");
  const [page, setPage] = useState(num);

  const { loading, error, data } = useQuery(MARK_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12 },
  });

  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const { marks } = data.searchMarks;
    const count = data.searchMarks.totalPage;
    const markMovieIds = marks.map((mark) => parseInt(mark.movieId));
    const user = dataU.publicUser;
    const markSub = [...marks];
    const marksModi = markSub.sort(function (a, b) {
      return a.movieId - b.movieId;
    });
    return (
      <>
        <Loader state={false} />
        <AppBar
          position="absolute"
          open={open}
          color="inherit"
          params={params}
          setParams={setParams}
        >
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
          <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
            <h2>HOT MARK</h2>
            <Grid container spacing={2}>
              <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                <GetMovie
                  marks={marksModi}
                  markMovieIds={markMovieIds}
                  user={user}
                  count={count}
                  page={page}
                  setPage={setPage}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
});
