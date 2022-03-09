import { useQuery } from "@apollo/client";
import { Avatar, Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { memo, useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";
import { cardStyles2 } from "../cards/CardStyles";
import { CustomCard } from "../cards/CustomCard";
import { Loader } from "../accessories/Loader";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Stars } from "../accessories/Stars";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import { MarkThreeVertIcon } from "../cards/MarkThreeVertIcon";
import { UserInfoContext } from "../providers/UserInfoProvider";
import MediaQuery from "react-responsive";
import { LoggedUserInfoContext } from "../providers/LoggedUserInfoProvider";
import { Link } from "react-router-dom";
import defaultImage from "../../images/stock-photos/people-3.jpg";

export const FavoTabPanel = memo(() => {
  const styles = cardStyles2();
  const { authState } = useContext(UserAuthContext);
  const { favorites } = useContext(UserInfoContext);
  const { LoggedFavoMarkIds, LoggedClipMovieIds } = useContext(LoggedUserInfoContext);
  const favoMarkIds = favorites.map((favo) => favo.mark.id);
  const favoredMarks = favorites.map((favo) => favo.mark);
  const favoredMarkMovieIds = favoredMarks.map((mark) => mark.movieId);
  const favoredMarkCommeSum = favoredMarks.map((mark) => mark.comments.length);
  const favoredMarkFavoSum = favoredMarks.map((mark) => mark.favorites.length);
  const favoUserId = favoredMarks.map((mark) => mark.user.id);
  const favoUserName = favoredMarks.map((mark) => mark.user.nickname);
  const favoUserPath = favoredMarks.map((mark) => mark.user.path);
  const score = favoredMarks.map((mark) => mark.score);
  const content = favoredMarks.map((mark) => mark.content);
  const favoMarkId = favoredMarks.map((mark) => mark.id);
  const LoggedFavoBool = favoMarkIds.map((favoId) => LoggedFavoMarkIds.includes(favoId));
  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: favoredMarkMovieIds },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const movies = data.movies;
    const ary = movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      const initialState = LoggedClipMovieIds.includes(movie.id);
      return {
        movie: movies[idx],
        ave,
        initialState,
        clipSum: movie.clips.length,
        markSum: movie.marks.length,
        favoredMark: favoredMarks[idx],
        score: score[idx],
        content: content[idx],
        favoMarkId: favoMarkId[idx],
        favoedMarkCommeSum: favoredMarkCommeSum[idx],
        favoredMarkFavoSum: favoredMarkFavoSum[idx],
        favoUserId: favoUserId[idx],
        favoUserName: favoUserName[idx],
        favoUserPath: favoUserPath[idx],
        favoBool: LoggedFavoBool[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {ary.map((ary) => (
              <Grid item lg={6} md={6} sm={12} xs={12} key={ary.favoMarkId} my={4}>
                <Card sx={{ backgroundColor: "#fff" }}>
                  <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                    <Grid item md={0.5} sm={1.5} xs={0} />
                    <Grid item md={6} sm={6} xs={4.7}>
                      <MediaQuery query="(min-width: 550px)">
                        <Box display="flex">
                          <IconButton>
                            <Link to={`/user/${ary.favoUserId}/profile`}>
                              <Avatar
                                alt={ary.favoUserName}
                                src={!ary.favoUserPath ? defaultImage : ary.favoUserPath}
                                sx={{ width: 32, height: 32 }}
                              ></Avatar>
                            </Link>
                          </IconButton>
                          <Link to={`/user/${ary.favoUserId}/profile`}>
                            <Typography
                              sx={{
                                ml: 1,
                                pt: 2,
                                fontFamily: "arial, sans-serif",
                                color: "black",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              fontSize="0.8rem"
                            >
                              {ary.favoUserName}
                            </Typography>
                          </Link>
                        </Box>
                        <Typography
                          sx={{
                            maxWidth: 300,
                            fontSize: "1.3rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: `'Vollkorn', serif`,
                          }}
                        >
                          {ary.movie.movieName}
                        </Typography>
                        <Stars value={ary.score} size={19} pt="3px" starNum={true} />
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
                          <Typography fontSize="0.9rem">{ary.content}</Typography>
                        </Scrollbars>
                      </MediaQuery>
                      <MediaQuery query="(max-width: 550px)">
                        <Box display="flex">
                          <IconButton>
                            <Link to={`/user/${ary.favoUserId}/profile`}>
                              <Avatar
                                alt={ary.favoUserName}
                                src={!ary.favoUserPath ? defaultImage : ary.favoUserPath}
                                sx={{ width: 22, height: 22 }}
                              ></Avatar>
                            </Link>
                          </IconButton>
                          <Link to={`/user/${ary.favoUserId}/profile`}>
                            <Typography
                              sx={{
                                ml: 0.5,
                                pt: 1.5,
                                fontFamily: "arial, sans-serif",
                                color: "black",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              fontSize="0.6rem"
                            >
                              {ary.favoUserName}
                            </Typography>
                          </Link>
                        </Box>
                        <Typography
                          sx={{
                            maxWidth: 200,
                            overflow: "hidden",
                            fontSize: "0.8rem",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: `'Vollkorn', serif`,
                          }}
                        >
                          {ary.movie.movieName}
                        </Typography>
                        <Stars value={ary.score} size={12} pt="1px" typo="0.7rem" starNum={true} />
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
                          <Typography fontSize="0.6rem">{ary.content}</Typography>
                        </Scrollbars>
                      </MediaQuery>
                      <CreateFavoIcon
                        favoSum={ary.favoredMarkFavoSum}
                        auth={parseInt(authState.id)}
                        markStrId={ary.favoMarkId}
                        favoBool={ary.favoBool}
                      />
                      <CreateCommentIcon markId={ary.favoMarkId} info={ary} />
                      {ary.favoedMarkCommeSum}
                    </Grid>
                    <Grid item md={4.5} sm={3} xs={5.0}>
                      <CustomCard
                        classes={styles}
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
                        <MarkThreeVertIcon markId={ary.favoMarkId} userId={authState.id} />
                      ) : null}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    );
  }
});
