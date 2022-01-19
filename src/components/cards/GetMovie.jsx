import { useQuery } from "@apollo/client";
import { Card, Divider, Grid } from "@mui/material";
import { MOVIES } from "../../graphql/queries";
import { CustomCard } from "./CustomCard";
import stock1 from "../../images/stock-photos/stock-1.jpg";
import { cardStyles2 } from "./CardStyles";
import { useContext } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { average } from "../../Helper";
import { Stars } from "../Stars";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { CreateCommentIcon } from "../../graphql/CreateCommentIcon";
import Scrollbars from "react-custom-scrollbars-2";
import { BasicPagination } from "../UserProfile/Pagination";

export const GetMovie = (props) => {
  const { markMovieIds, marks, user, setPage, page, count } = props;
  const styles = cardStyles2();
  const { authState } = useContext(UserAuthContext);
  const { error, loading, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
    fetchPolicy: "cache-and-network",
  });
  if (error) return `Error ${error.message}`;
  if (loading) return null;
  if (data) {
    const movies = data.movies;
    const movieIds = movies.map((movie) => movie.id);
    const aveScore = movies.map((movie) => movie.marks.map((mark) => mark.score));
    const markIds = marks.map((mark) => mark.id);
    const clippedMovieIds = user.clips.map((clip) => clip.movieId);
    const bools = movieIds.map((movieId) => clippedMovieIds.includes(movieId));
    const favoIds = user.favorites.map((favo) => favo.mark.id);
    const favoBools = markIds.map((markId) => favoIds.includes(markId));
    const ary = marks.map((itemOfMark, idx) => {
      return {
        movie: movies[idx],
        mark: marks[idx],
        markMovieId: markMovieIds[idx],
        ave: aveScore.map((ave) => average(ave))[idx],
        clipBool: bools[idx],
        favoBool: favoBools[idx],
      };
    });
    return (
      <>
        {ary.map((ary, index) => (
          <Grid item lg={6} md={6} sm={12} key={index} my={2}>
            <Card className="card-box" sx={{ backgroundColor: "#ceadad" }}>
              <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                <Grid item md={0.5} sm={1.5} />
                <Grid item md={7} sm={6}>
                  <h4>{ary.movie.movieName}</h4>
                  <Stars value={ary.mark.score} size={23} />
                  <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={150}>
                    <p>{ary.mark.content}</p>
                  </Scrollbars>
                  <Divider style={{ background: "inherit" }} />
                  <CreateFavoIcon
                    favoSum={ary.mark.favorites.length}
                    auth={parseInt(authState.id)}
                    markStrId={ary.mark.id}
                    initialState={ary.favoBool}
                  />
                  <CreateCommentIcon
                    id={ary.mark.id}
                    markBool={ary.favoBool}
                    ave={ary.ave}
                    clipBool={ary.clipBool}
                    userId={parseInt(authState.id)}
                  />
                  {ary.mark.comments.length}
                </Grid>
                <Grid item md={4} sm={3}>
                  <CustomCard
                    classes={styles}
                    image={stock1}
                    movieName={ary.movie.movieName}
                    movie={ary.movie}
                    score={Number.isNaN(ary.ave) ? 0 : ary.ave}
                    mark={ary.movie.marks.length}
                    clip={ary.movie.clips.length}
                    id={ary.movie.id}
                    auth={parseInt(authState.id)}
                    size="small"
                    initialState={ary.clipBool}
                  />
                </Grid>
                <Grid item md={0.5} sm={1.5} />
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
};
