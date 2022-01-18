import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { MOVIE } from "../../graphql/queries";
import { CustomCard } from "./CustomCard";
import stock1 from "../../images/stock-photos/stock-1.jpg";
import { cardStyles2 } from "./CardStyles";
import { useContext } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { average } from "../../Helper";
import { Loader } from "../Loader";

export const GetMovie = (props) => {
  const { markMovieId } = props;
  const styles = cardStyles2();
  const { authState } = useContext(UserAuthContext);
  const { error, loading, data } = useQuery(MOVIE, {
    variables: { id: markMovieId },
    fetchPolicy: "cache-and-network",
  });
  if (error) return `Error ${error.message}`;
  if (loading) return <Loader state={true} />;
  if (data) {
    const movie = data.movie;
    const aveScore = movie.marks.map((score) => average(score));
    // const bools = movieIds.map((movieId) => clippedMovieIds.includes(movieId));
    return (
      <>
        <Loader state={false} />;
        <Grid item md={4}>
          <CustomCard
            classes={styles}
            image={stock1}
            movieName={movie.movieName}
            movie={movie}
            score={Number.isNaN(aveScore) ? 0 : aveScore}
            mark={movie.marks.length}
            clip={movie.clips.length}
            id={movie.id}
            auth={parseInt(authState.id)}
            size="small"
            // initialState={ary.clipBool}
          />
        </Grid>
      </>
    );
  }
};
