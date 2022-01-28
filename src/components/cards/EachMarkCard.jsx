import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { memo, useContext, useState } from "react";
import { MARK_PAGES } from "../../graphql/queries";
import { Loader } from "../accessories/Loader";
import { DashBoardContext } from "../providers/DashBoardProvider";
import { GetMovie } from "./GetMovie";

export const EachMarkCard = memo((props) => {
  const { num } = props;
  const { dataU } = useContext(DashBoardContext);
  const [page, setPage] = useState(num);

  const { loading, error, data } = useQuery(MARK_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12 },
  });

  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const { marks } = data.searchMarks;
    const count = data.searchMarks.totalPage;
    const markMovieIds = marks.map((mark) => parseInt(mark.movieId));
    const user = dataU.publicUser;
    const markSub = [...marks];
    const marksModi = markSub.sort(function (a, b) {
      return a.movieId - b.movieId; //オブジェクトの昇順ソート
    });
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            <GetMovie
              marks={marksModi}
              markMovieIds={markMovieIds}
              user={user}
              count={count}
              page={page}
              setPage={setPage}
            />
          </Grid>
        </Grid>
      </>
    );
  }
});
