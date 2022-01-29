import { useQuery } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { memo, useContext, useState } from "react";
import { MOVIE_PAGES } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles } from "./CardStyles";
import { CustomCard } from "./CustomCard";
import { BasicPagination } from "../userProfile/Pagination";
import { Loader } from "../accessories/Loader";
import { DashBoardContext } from "../providers/DashBoardProvider";
import { SelectBox } from "../accessories/SelectBox";

export const EachMovieCard = memo((props) => {
  const { num } = props;
  const { dataU } = useContext(DashBoardContext);
  const styles = cardStyles();
  const [page, setPage] = useState(num);
  const userClipIds = dataU.publicUser.clips.map((clip) => parseInt(clip.movieId));
  const [params, setParams] = useState("");
  const { loading, error, data } = useQuery(MOVIE_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12, category: params },
    fetchPolicy: "cache-and-network",
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
        <Box display="flex" justifyContent="flex-end">
          <SelectBox params={params} setParams={setParams} />
        </Box>
        <Grid
          container
          mt={0}
          columnSpacing={2}
          rowSpacing={3}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {ary.map((info, index) => (
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
          ))}
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
        </Grid>
      </>
    );
  }
});
