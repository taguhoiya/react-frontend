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
  const userClipIds = dataU.publicUser.clips.map((clip) => parseInt(clip.movieId));
  const { loading, error, data } = useQuery(MOVIE_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12 },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const count = data.searchMovies.totalPage;
    const ary = data.searchMovies.movies.map((movie) => {
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
