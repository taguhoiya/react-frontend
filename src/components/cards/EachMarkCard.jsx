import { useQuery } from "@apollo/client";
import { Card, Divider, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { MARK_PAGES, USER_INFO_TOP_PAGE } from "../../graphql/queries";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { BasicPagination } from "../UserProfile/Pagination";
import { Loader } from "../Loader";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import Scrollbars from "react-custom-scrollbars-2";
import { Stars } from "../Stars";
import { CreateCommentIcon } from "../../graphql/CreateCommentIcon";
import { GetMovie } from "./GetMovie";

// TODO usememoかcallback使う
export const EachMarkCard = (props) => {
  const { num } = props;
  const [page, setPage] = useState(num);
  const { authState } = useContext(UserAuthContext);

  const { loading, error, data } = useQuery(MARK_PAGES, {
    variables: { page: !page ? 1 : page, limit: 20 },
    fetchPolicy: "cache-and-network",
  });
  const { data: dataU, error: errorU } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: parseInt(authState.id) },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loader state={true} />;
  if (error || errorU) return `Error ${error.message}``Error ${errorU.message}`;
  if (data && dataU) {
    // about data
    const marks = data.searchMarks.marks;
    const count = data.searchMarks.totalPage;
    const markMovieIds = marks.map((mark) => parseInt(mark.movieId));

    // // about dataU
    // const userInfo = dataU.publicUser;
    // const userClipIds = userInfo.clips.map((clip) => parseInt(clip.movieId));

    // about dataX
    // const movies = dataX.movies;
    // const markScoreArray = movies.map((movie) => movie.marks.map((mark) => mark.score));
    // const aveScore = markScoreArray.map((score) => average(score));
    // const movieIds = movies.map((movie) => parseInt(movie.id));
    // const bools = movieIds.map((movieId) => clippedMovieIds.includes(movieId));
    const ary = marks.map((itemOfMark, idx) => {
      return {
        // movie: movies[idx],
        mark: marks[idx],
        markMovieId: markMovieIds[idx],
        // ave: aveScore[idx],
        // clipBool: bools[idx],
        // markBool: markBools[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {ary.map((ary, index) => (
              <Grid item md={6} key={index} my={2}>
                <Card className="card-box" sx={{ backgroundColor: "#ceadad" }}>
                  <Grid container columnSpacing={{ xs: 2, sm: 3, md: 4 }} py={2}>
                    <Grid item md={0.5} />
                    <Grid item md={7} className="card-header">
                      {/* <h3>{ary.movie.movieName}</h3> */}
                      <Stars value={ary.mark.score} />
                      <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={150}>
                        <p>{ary.mark.content}</p>
                      </Scrollbars>
                      <Divider style={{ background: "inherit" }} />
                      <CreateFavoIcon
                        favoSum={ary.mark.favorites.length}
                        auth={parseInt(authState.id)}
                        markStrId={ary.mark.id}
                        initialState={ary.markBool}
                      />
                      <CreateCommentIcon
                        id={ary.mark.id}
                        markBool={ary.markBool}
                        ave={ary.ave}
                        clipBool={ary.clipBool}
                        userId={parseInt(authState.id)}
                      />
                      {ary.mark.comments.length}
                    </Grid>
                    <GetMovie markMovieId={ary.markMovieId} />
                    <Grid item md={0.5} />
                  </Grid>
                </Card>
              </Grid>
            ))}
            <Grid
              item
              mt={3}
              style={{
                position: "relative",
                left: "50%",
                top: "50%",
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
};
