import { useQuery } from "@apollo/client";
import { Card, Divider, Grid } from "@mui/material";
import { MOVIES } from "../../graphql/queries";
import { CustomCard } from "./CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles2 } from "./CardStyles";
import { memo, useContext } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { average } from "../../Helper";
import { Stars } from "../Stars";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import Scrollbars from "react-custom-scrollbars-2";
import { BasicPagination } from "../userProfile/Pagination";
import { Loader } from "../Loader";

export const GetMovie = memo((props) => {
  const { markMovieIds, marks, user, setPage, page, count } = props;
  const styles = cardStyles2();
  const { authState } = useContext(UserAuthContext);
  const favoIds = user.favorites.map((favo) => favo.mark.id);
  const markIds = marks.map((mark) => mark.id);
  const clippedMovieIds = user.clips.map((clip) => clip.movieId);
  const favoBools = markIds.map((markId) => favoIds.includes(markId));
  const { error, loading, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
  });
  if (error) return `Error ${error.message}`;
  if (loading) return <Loader state={true} />;
  if (data) {
    const movies = data.movies;
    const ary = movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      const initialState = clippedMovieIds.includes(movie.id);
      const clipSum = movie.clips.length;
      const markSum = movie.marks.length;
      const id = parseInt(movie.id);
      return {
        movie,
        clipSum,
        markSum,
        ave,
        id,
        mark: marks[idx],
        initialState,
        favoBool: favoBools[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        {ary.map((ary, index) => (
          <Grid item lg={6} md={6} sm={12} key={index} my={4}>
            <Card className="card-box" sx={{ backgroundColor: "#e6edf5" }}>
              <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                <Grid item md={0.5} sm={1.5} xs={0.5} />
                <Grid item md={6.5} sm={6} xs={6}>
                  <h4
                    style={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ary.movie.movieName}
                  </h4>
                  <Stars value={ary.mark.score} size={20} />
                  <Scrollbars autoHeight autoHeightMin={80} autoHeightMax={150}>
                    <p>{ary.mark.content}</p>
                  </Scrollbars>
                  <Divider style={{ background: "inherit" }} />
                  <CreateFavoIcon
                    favoSum={ary.mark.favorites.length}
                    auth={parseInt(authState.id)}
                    markStrId={ary.mark.id}
                    initialState={ary.favoBool}
                  />
                  <CreateCommentIcon info={ary} markId={ary.mark.id} />
                  {ary.mark.comments.length}
                </Grid>
                <Grid item md={4.5} sm={3} xs={5}>
                  <CustomCard
                    classes={styles}
                    image={stock1}
                    info={ary}
                    size="small"
                    ave={ary.ave}
                    movie={ary.movie}
                    markSum={ary.markSum}
                    initialState={ary.initialState}
                    clipSum={ary.clipSum}
                    movieName={ary.movie.movieName}
                    movieId={ary.movie.id}
                  />
                </Grid>
                <Grid item md={0.5} sm={1.5} xs={0} />
              </Grid>
            </Card>
          </Grid>
        ))}
        <Grid
          item
          mt={3}
          style={{
            position: "relative",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <BasicPagination page={page} setPage={setPage} count={count} />
        </Grid>
      </>
    );
  }
});
