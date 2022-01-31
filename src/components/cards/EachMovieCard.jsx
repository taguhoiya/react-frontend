import { useQuery } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import { MOVIE_PAGES } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles } from "./CardStyles";
import { CustomCard } from "./CustomCard";
import { BasicPagination } from "../userProfile/Pagination";
import { Loader, SubLoader } from "../accessories/Loader";
import { DashBoardContext } from "../providers/DashBoardProvider";
import { SelectBox } from "../accessories/SelectBox";
import { DrawerModi } from "../../components/headers/Drawer";
import { AppBar, ToolBarModi } from "../../components/headers/AppBar";
import { UserAuthContext } from "../providers/UserAuthProvider";
import MediaQuery from "react-responsive";

export const EachMovieCard = memo((props) => {
  const { num } = props;
  const { authState } = useContext(UserAuthContext);
  const profileUrl = `/user/${authState.id}/profile`;
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const [params, setParams] = useState("");
  const { dataU } = useContext(DashBoardContext);
  const styles = cardStyles();
  const [page, setPage] = useState(num);
  const [formState, setFormState] = useState("");
  const userClipIds = dataU.publicUser.clips.map((clip) => parseInt(clip.movieId));
  const { loading, error, data, refetch } = useQuery(MOVIE_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12, category: params, movieName: formState },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
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
        <AppBar
          position="absolute"
          open={open}
          color="inherit"
          params={params}
          setParams={setParams}
        >
          <ToolBarModi
            open={open}
            toggleDrawer={toggleDrawer}
            profileUrl={profileUrl}
            refetch={refetch}
            setFormState={setFormState}
          />
        </AppBar>
        <DrawerModi open={open} toggleDrawer={toggleDrawer} profileUrl={profileUrl} />
        <MediaQuery query="(max-width: 550px)">
          <Box
            component="main"
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Container maxWidth="xl" sx={{ mt: 12, mb: 4, ml: 4 }}>
              {!formState ? (
                <>
                  <h2>HOT MOVIE</h2>
                  <Box display="flex" justifyContent="flex-end" sx={{ m: 2 }}>
                    <SelectBox params={params} setParams={setParams} />
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ mt: 1, ml: 1 }} display="flex">
                    <Typography fontSize={15} sx={{ mt: 0.8 }}>
                      Searched by "{formState}"&nbsp;&nbsp;-
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography fontSize={23} sx={{ fontWeight: "bold" }}>
                      {data.searchMovies.totalCount}{" "}
                    </Typography>
                    <Typography fontSize={13} sx={{ mt: 1.4 }}>
                      &nbsp;&nbsp;results
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" sx={{ m: 2 }}>
                    <SelectBox params={params} setParams={setParams} />
                  </Box>
                </>
              )}
              <Grid
                container
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
                        image={stock1}
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
                      my={3}
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
          </Box>
        </MediaQuery>
        <MediaQuery query="(min-width: 550px)">
          <Box
            component="main"
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Container maxWidth="xl" sx={{ mt: 12, mb: 4, ml: 4 }}>
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
                        image={stock1}
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
                      my={3}
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
          </Box>
        </MediaQuery>
      </>
    );
  }
});
