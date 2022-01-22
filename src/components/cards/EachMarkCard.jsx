import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { memo, useState } from "react";
import { MARK_PAGES } from "../../graphql/queries";
import { Loader } from "../Loader";
import { GetMovie } from "./GetMovie";

// TODO usememoかcallback使う
export const EachMarkCard = memo((props) => {
  const { num, dataU } = props;
  const [page, setPage] = useState(num);

  const { loading, error, data } = useQuery(MARK_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12 },
  });

  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const marks = data.searchMarks.marks;
    const count = data.searchMarks.totalPage;
    const markMovieIds = marks.map((mark) => parseInt(mark.movieId));
    const user = dataU.publicUser;

    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            <GetMovie
              marks={marks}
              markMovieIds={markMovieIds}
              user={user}
              count={count}
              page={page}
              setPPage={setPage}
            />
          </Grid>
        </Grid>
      </>
    );
  }
});
