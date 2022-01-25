import { useQuery } from "@apollo/client";
import { Card, Divider, Grid } from "@mui/material";
import { memo, useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles2 } from "../cards/CardStyles";
import { CustomCard } from "../cards/CustomCard";
import { Loader, SubLoader } from "../Loader";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Stars } from "../Stars";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import { MarkThreeVertIcon } from "../cards/MarkThreeVertIcon";
import { UserInfoContext } from "../providers/UserInfoProvider";

export const FavoTabPanel = memo(() => {
  const styles = cardStyles2();
  const { authState } = useContext(UserAuthContext);
  const { favorites, clips } = useContext(UserInfoContext);
  const favoredMarks = favorites.map((favo) => favo.mark);
  const favoredMarkMovieIds = favoredMarks.map((mark) => mark.movie.id);
  const clippedMovieIds = clips.map((clip) => parseInt(clip.movie.id));
  const favoredMarkCommeSum = favoredMarks.map((mark) => mark.comments.length);
  const favoredMarkFavoSum = favoredMarks.map((mark) => mark.favorites.length);
  const favoUserId = favoredMarks.map((mark) => mark.user.id);
  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: favoredMarkMovieIds },
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
        ave,
        initialState,
        clipSum: movie.clips.length,
        markSum: movie.marks.length,
        favoredMark: favoredMarks[idx],
        favoedMarkCommeSum: favoredMarkCommeSum[idx],
        favoredMarkFavoSum: favoredMarkFavoSum[idx],
        favoUserId: favoUserId[idx],
      };
    });
    return (
      <>
        {!favorites[0] ? (
          <SubLoader state={true} />
        ) : (
          <>
            <Loader state={false} />
            <Grid container spacing={2}>
              <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                {ary.map((ary) => (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={ary.favoredMark.id} my={4}>
                    <Card sx={{ backgroundColor: "#e6edf5" }}>
                      <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                        <Grid item md={0.5} sm={1.5} xs={0} />
                        <Grid item md={6.5} sm={6} xs={4.7}>
                          <h4
                            style={{
                              maxWidth: 100,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {ary.movie.movieName}
                          </h4>
                          <Stars value={ary.favoredMark.score} size={19} pt="3px" starNum={false} />
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
                            <p>{ary.favoredMark.content}</p>
                          </Scrollbars>
                          <Divider style={{ background: "inherit" }} />
                          <CreateFavoIcon
                            favoSum={ary.favoredMarkFavoSum}
                            auth={parseInt(authState.id)}
                            markStrId={ary.favoredMark.id}
                            favoBool={true}
                          />
                          <CreateCommentIcon markId={ary.favoredMark.id} info={ary} />
                          {ary.favoedMarkCommeSum}
                        </Grid>
                        <Grid item md={4.5} sm={3} xs={4.9}>
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
                        <Grid item md={0.5} sm={1.5} xs={0.2}>
                          {ary.favoUserId == authState.id ? (
                            <MarkThreeVertIcon markId={ary.favoredMark.id} userId={authState.id} />
                          ) : null}
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
