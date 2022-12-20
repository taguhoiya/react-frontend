import { Box, Container, Grid, Typography } from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import { average } from "../../Helper";

import { cardStyles, cardStyles4 } from "./CardStyles";
import { CustomCard } from "./CustomCard";
import { BasicPagination } from "../userProfile/Pagination";
import { Loader, SubLoader } from "../accessories/Loader";
import { DashBoardContext } from "../providers/DashBoardProvider";
import { SelectBox } from "../accessories/SelectBox";
import { DrawerModi } from "../headers/Drawer";
import { AppBar, ToolBarModi } from "../headers/AppBar";
import { UserAuthContext } from "../providers/UserAuthProvider";
import MediaQuery from "react-responsive";
import { MovieCardContext } from "../providers/MovieCardProvider";

export const EachMovieCard = memo(() => {
  const { authState } = useContext(UserAuthContext);
  const { data, params, setPage, setParams, formState, page } = useContext(MovieCardContext);
  const { dataU } = useContext(DashBoardContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const styles = cardStyles();
  const styles2 = cardStyles4();
  const userClipIds = dataU.publicUser.clips.map((clip) => parseInt(clip.movieId));
  const count = data.searchMovies.totalPage;
  const movies = data.searchMovies.movies;
  const ary = movies.map((movie) => {
    const clipSum = movie.clips.length;
    const markSum = movie.marks.length;
    const markScoreArray = movie.marks.map((mark) => mark.score);
    const ave = average(markScoreArray);
    const id = parseInt(movie.id);
    const initialState = userClipIds.includes(id);
    return { movie, clipSum, markSum, ave, id, initialState };
  });
  return (
    <>
      <Loader state={false} />
      <AppBar position="absolute" open={open} color="inherit" params={params} setParams={setParams}>
        <ToolBarModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
      </AppBar>
      <DrawerModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
      <MediaQuery query="(max-width: 550px)">
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          {!formState ? (
            <>
              <h2>HOT MOVIE</h2>
              <Box display="flex" justifyContent="flex-end" sx={{ m: 2 }}>
                <SelectBox params={params} setParams={setParams} />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ mt: 1 }} display="flex">
                <Typography fontSize={13} sx={{ mt: 1.1 }}>
                  Searched by "{formState}"&nbsp;&nbsp;-
                </Typography>
                &nbsp;
                <Typography fontSize={23} sx={{ fontWeight: "bold" }}>
                  {data.searchMovies.totalCount}
                </Typography>
                <Typography fontSize={11} sx={{ mt: 1.8 }}>
                  &nbsp;results
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end" sx={{ m: 2 }}>
                <SelectBox params={params} setParams={setParams} />
              </Box>
            </>
          )}
          <Grid
            container
            columnSpacing={1}
            rowSpacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {!movies[0] ? (
              <SubLoader state={true} />
            ) : (
              ary.map((info, index) => (
                <Grid item key={index} xs={6}>
                  <CustomCard
                    classes={styles2}
                    image={info.movie.posterPath}
                    info={info}
                    movie={info.movie}
                    size="large"
                    ave={info.ave}
                    markSum={info.markSum}
                    initialState={info.initialState}
                    clipSum={info.clipSum}
                    movieName={info.movie.movieName}
                    movieId={info.movie.id}
                    star={true}
                  />
                </Grid>
              ))
            )}
            {!movies[0] ? null : (
              <Grid container py={2}>
                <Grid
                  mt={3}
                  sx={{
                    position: "relative",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <BasicPagination page={page} setPage={setPage} count={count} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </MediaQuery>
      <MediaQuery query="(min-width: 550px)">
        <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
          {!formState ? (
            <>
              <h1>HOT MOVIE</h1>
              <Box display="flex" justifyContent="flex-end">
                <SelectBox params={params} setParams={setParams} />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ mt: 5, ml: 5 }} display="flex">
                <Typography fontSize={20} sx={{ mt: 1.0 }}>
                  Searched by "{formState}"&nbsp;&nbsp;-
                </Typography>
                &nbsp; &nbsp;
                <Typography fontSize={30} sx={{ fontWeight: "bold" }}>
                  {data.searchMovies.totalCount}{" "}
                </Typography>
                <Typography fontSize={15} sx={{ mt: 2 }}>
                  &nbsp;&nbsp;results
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <SelectBox params={params} setParams={setParams} />
              </Box>
            </>
          )}

          <Grid
            container
            mt={0}
            columnSpacing={2}
            rowSpacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {!movies[0] ? (
              <SubLoader state={true} />
            ) : (
              ary.map((info, index) => (
                <Grid item key={index}>
                  <CustomCard
                    classes={styles}
                    image={info.movie.posterPath}
                    info={info}
                    movie={info.movie}
                    size="large"
                    ave={info.ave}
                    markSum={info.markSum}
                    initialState={info.initialState}
                    clipSum={info.clipSum}
                    movieName={info.movie.movieName}
                    movieId={info.movie.id}
                    star={true}
                  />
                </Grid>
              ))
            )}
            {!movies[0] ? null : (
              <Grid container py={2}>
                <Grid
                  mt={5}
                  sx={{
                    position: "relative",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <BasicPagination page={page} setPage={setPage} count={count} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </MediaQuery>
    </>
  );
});
