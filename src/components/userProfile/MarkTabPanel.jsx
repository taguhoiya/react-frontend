import { Card, Grid, Typography } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { CustomCard } from "../cards/CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { memo, useContext } from "react";
import { cardStyles2 } from "../cards/CardStyles";
import { average } from "../../Helper";
import { Loader, SubLoader } from "../Loader";
import { MOVIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { Stars } from "../Stars";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import { MarkThreeVertIcon } from "../cards/MarkThreeVertIcon";
import { UserInfoContext } from "../providers/UserInfoProvider";
import MediaQuery from "react-responsive";

export const MarkTabPanel = memo(() => {
  const { marks, favoredMarks, clippedMovieIds } = useContext(UserInfoContext);
  const { authState } = useContext(UserAuthContext);
  const styles = cardStyles2();
  const markCommes = marks.map((mark) => mark.comments.length);
  const markMovieIds = marks.map((mark) => parseInt(mark.movie.id));
  const favoredMarkIds = favoredMarks.map((mark) => parseInt(mark.id));
  const markIds = marks.map((mark) => parseInt(mark.id));
  const favoBools = markIds.map((markId) => favoredMarkIds.includes(markId));

  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const movies = data.movies;
    const ary = movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      const initialState = clippedMovieIds.includes(parseInt(movie.id));
      return {
        movie: movies[idx],
        markComme: markCommes[idx],
        markSum: movie.marks.length,
        clipSum: movie.clips.length,
        mark: marks[idx],
        ave,
        initialState,
        favoBool: favoBools[idx],
      };
    });
    return (
      <>
        {!marks[0] ? (
          <SubLoader state={true} />
        ) : (
          <>
            <Loader state={false} />
            <Grid container spacing={2}>
              <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                {ary.map((ary, index) => (
                  <Grid item lg={6} md={6} xs={12} key={index} my={4}>
                    <Card sx={{ backgroundColor: "#e6edf5" }}>
                      <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                        <Grid item md={0.5} sm={1.5} xs={0} />
                        <Grid item md={6.5} sm={6} xs={4.7}>
                          <MediaQuery query="(min-width: 550px)">
                            <h4
                              style={{
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {ary.movie.movieName}
                            </h4>
                            <Stars value={ary.mark.score} size={19} pt="3px" starNum={true} />
                            <Scrollbars
                              autoHeight
                              autoHeightMin={120}
                              autoHeightMax={150}
                              style={{
                                border: "1px solid rgba(192, 231, 231, 0.733)",
                                borderRadius: "10px",
                                padding: "0px 6px",
                              }}
                            >
                              <Typography fontSize="0.9rem">{ary.mark.content}</Typography>
                            </Scrollbars>
                          </MediaQuery>
                          <MediaQuery query="(max-width: 550px)">
                            <h6
                              style={{
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {ary.movie.movieName}
                            </h6>
                            <Stars
                              value={ary.mark.score}
                              size={12}
                              pt="1px"
                              typo="0.7rem"
                              starNum={true}
                            />
                            <Scrollbars
                              autoHeight
                              autoHeightMin={100}
                              autoHeightMax={130}
                              style={{
                                border: "1px solid rgba(192, 231, 231, 0.733)",
                                borderRadius: "8px",
                                paddingInline: "12px",
                              }}
                            >
                              <Typography fontSize="0.6rem">{ary.mark.content}</Typography>
                            </Scrollbars>
                          </MediaQuery>

                          <CreateFavoIcon
                            favoSum={ary.mark.favorites.length}
                            auth={parseInt(authState.id)}
                            markStrId={ary.mark.id}
                            favoBool={ary.favoBool}
                          />
                          <CreateCommentIcon info={ary} markId={ary.mark.id} />
                          {ary.markComme}
                        </Grid>
                        <Grid item md={4.5} sm={3} xs={5.0}>
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
                        <Grid item md={0.5} sm={1.5} xs={0.5}>
                          <MarkThreeVertIcon markId={ary.mark.id} userId={authState.id} />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
});
