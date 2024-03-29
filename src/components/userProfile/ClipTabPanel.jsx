import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { memo, useContext } from "react";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";

import { cardStyles2 } from "../cards/CardStyles";
import { CustomCard } from "../cards/CustomCard";
import { Loader } from "../accessories/Loader";
import { LoggedUserInfoContext } from "../providers/LoggedUserInfoProvider";
import { UserInfoContext } from "../providers/UserInfoProvider";

export const ClipTabPanel = memo(() => {
  const { clips, clippedMovieIds } = useContext(UserInfoContext);
  const styles = cardStyles2();
  const { LoggedClipMovieIds } = useContext(LoggedUserInfoContext);
  const clipBool = clippedMovieIds.map((movieId) => LoggedClipMovieIds.includes(movieId));
  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: clippedMovieIds },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const movies = data.movies;
    const ary = data.movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      return {
        movie: movies[idx],
        clip: clips[idx],
        ave,
        initialState: clipBool[idx],
        markSum: movie.marks.length,
        clipSum: movie.clips.length,
      };
    });
    return (
      <>
        <Loader state={false} />
        <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
          {ary.map((ary, index) => (
            <Grid item key={index} md={2} xs={6}>
              <CustomCard
                classes={styles}
                info={ary}
                movie={ary.movie}
                size="small"
                ave={ary.ave}
                markSum={ary.markSum}
                initialState={ary.initialState}
                clipSum={ary.clipSum}
                movieName={ary.movie.movieName}
                movieId={ary.movie.id}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
});
