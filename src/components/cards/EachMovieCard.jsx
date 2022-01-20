import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { MOVIE_PAGES, USER_INFO_TOP_PAGE } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/stock-1.jpg";
import { cardStyles } from "./CardStyles";
import { CustomCard } from "./CustomCard";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { BasicPagination } from "../UserProfile/Pagination";
import { Loader } from "../Loader";

// TODO usememoかcallback使う
export const EachMovieCard = (props) => {
  const { num } = props;
  const styles = cardStyles();
  const [page, setPage] = useState(num);
  const { authState } = useContext(UserAuthContext);
  const { loading, error, data } = useQuery(MOVIE_PAGES, {
    variables: { page: !page ? 1 : page, limit: 16 },
  });
  const { data: dataU, error: errorU } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: parseInt(authState.id) },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loader state={true} />;
  if (error || errorU) return `Error ${errorU.message}`;
  if (data && dataU) {
    // about data
    const movieArray = data.searchMovies.movies;
    const clipCounts = movieArray.map((movie) => movie.clips.length);
    const markCounts = movieArray.map((movie) => movie.marks.length);
    const markScoreArray = movieArray.map((movie) => movie.marks.map((mark) => mark.score));
    const aveScore = markScoreArray.map((score) => average(score));
    const count = data.searchMovies.totalPage;
    const movieKeys = movieArray.map((movie) => parseInt(movie.id));

    // about dataU
    const userInfo = dataU.publicUser;
    const userClipIds = userInfo.clips.map((clip) => parseInt(clip.movieId));
    const initialStates = movieKeys.map((movieId) => userClipIds.includes(movieId));
    const ary = movieKeys.map((itemOfMovie, idx) => {
      return {
        id: movieKeys[idx],
        movie: movieArray[idx],
        clipSum: clipCounts[idx],
        markSum: markCounts[idx],
        ave: aveScore[idx],
        initialState: initialStates[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2} justify="center">
          {ary.map((info, index) => (
            <Grid item key={index}>
              <CustomCard
                classes={styles}
                movie={info.movie}
                image={stock1}
                score={Number.isNaN(info.ave) ? 0 : info.ave}
                mark={info.markSum}
                clip={info.clipSum}
                id={info.id}
                auth={parseInt(authState.id)}
                size="large"
                initialState={info.initialState}
              />
            </Grid>
          ))}
          <Grid
            item
            mt={3}
            style={{
              position: "relative",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <BasicPagination page={page} setPage={setPage} count={count} />
          </Grid>
        </Grid>
      </>
    );
  }
};
