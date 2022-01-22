import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { memo, useContext, useState } from "react";
import { MOVIE_PAGES } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles } from "./CardStyles";
import { CustomCard } from "./CustomCard";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { BasicPagination } from "../userProfile/Pagination";
import { Loader } from "../Loader";

export const EachMovieCard = memo((props) => {
  const { num, dataU } = props;
  const styles = cardStyles();
  const [page, setPage] = useState(num);
  const { authState } = useContext(UserAuthContext);
  const { loading, error, data } = useQuery(MOVIE_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12 }
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
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
        <Grid
          container
          columnSpacing={4}
          rowSpacing={6}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
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
            sx={{
              m: 6,
              position: "relative",
            }}
          >
            <BasicPagination page={page} setPage={setPage} count={count} />
          </Grid>
        </Grid>
      </>
    );
  }
});
