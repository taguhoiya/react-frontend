import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { memo } from "react";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";

import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles3 } from "../cards/CardStyles";
import { CustomCard } from "../cards/CustomCard";
import { Loader } from "../Loader";

export const ClipTabPanel = memo((props) => {
  const styles = cardStyles3();
  const clips = props.clips;
  const clipIds = clips.map((clip) => parseInt(clip.movie.id));
  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: clipIds },
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
        initialState: true,
        markSum: movie.marks.length,
        clipSum: movie.clips.length,
      };
    });
    return (
      <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
        {ary.map((ary, index) => (
          <Grid item key={index} md={2}>
            <CustomCard
              classes={styles}
              image={stock1}
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
    );
  }
});
