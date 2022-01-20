import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { MARK_PAGES, USER_INFO_TOP_PAGE } from "../../graphql/queries";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Loader } from "../Loader";
import { GetMovie } from "./GetMovie";

// TODO usememoかcallback使う
export const EachMarkCard = (props) => {
  const { num } = props;
  const [page, setPage] = useState(num);
  const { authState } = useContext(UserAuthContext);

  const { loading, error, data } = useQuery(MARK_PAGES, {
    variables: { page: !page ? 1 : page, limit: 16 },
    fetchPolicy: "cache-and-network",
  });
  const { data: dataU, error: errorU } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: parseInt(authState.id) },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loader state={true} />;
  if (error || errorU) return `Error ${error.message}``Error ${errorU.message}`;
  if (data && dataU) {
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
};
