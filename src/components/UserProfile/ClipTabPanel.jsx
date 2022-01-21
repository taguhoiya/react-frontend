import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { memo, useContext } from "react";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";

import stock1 from "../../images/stock-photos/stock-1.jpg";
import { cardStyles3 } from "../cards/CardStyles";
import { CustomCard } from "../cards/CustomCard";
import { Loader } from "../Loader";
import { UserAuthContext } from "../providers/UserAuthProvider";

export const ClipTabPanel = memo((props) => {
  const { authState } = useContext(UserAuthContext);
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
    const markScoreArray = movies.map((movie) => movie.marks.map((mark) => mark.score));
    const aveScore = markScoreArray.map((score) => average(score));
    const ary = movies.map((itemOfMovie, idx) => {
      return {
        movie: movies[idx],
        clip: clips[idx],
        ave: aveScore[idx],
      };
    });
    return (
      <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
        {ary.map((ary, index) => (
          <Grid item key={index} md={2}>
            <CustomCard
              classes={styles}
              image={stock1}
              movie={ary.movie}
              score={Number.isNaN(ary.ave) ? 0 : ary.ave}
              mark={ary.movie.marks.length}
              clip={ary.movie.clips.length}
              id={ary.movie.id}
              auth={parseInt(authState.id)}
              size="small"
              initialState={true}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
});
