import { Avatar, Box, Card, Grid, IconButton, Typography } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { CustomCard } from "../cards/CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { memo, useContext } from "react";
import { cardStyles2 } from "../cards/CardStyles";
import { average } from "../../Helper";
import { Loader, SubLoader } from "../accessories/Loader";
import { MOVIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { Stars } from "../accessories/Stars";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import { MarkThreeVertIcon } from "../cards/MarkThreeVertIcon";
import { UserInfoContext } from "../providers/UserInfoProvider";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { LoggedUserInfoContext } from "../providers/LoggedUserInfoProvider";

export const MarkTabPanel = memo(() => {
  const { marks, user, src } = useContext(UserInfoContext);
  const { authState } = useContext(UserAuthContext);
  const { LoggedFavoMarkIds, LoggedClipMovieIds } = useContext(LoggedUserInfoContext);
  const styles = cardStyles2();
  const markCommes = marks.map((mark) => mark.comments.length);
  const markMovieIds = marks.map((mark) => mark.movieId);
  const markIds = marks.map((mark) => mark.id);
  const LoggedFavoBools = markIds.map((markId) => LoggedFavoMarkIds.includes(markId));
  const score = marks.map((mark) => mark.score);
  const content = marks.map((mark) => mark.content);
  const markId = marks.map((mark) => mark.id);
  const markFavoSum = marks.map((mark) => mark.favorites.length);
  const markUserId = marks.map((mark) => parseInt(mark.userId));
  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
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
        markComme: markCommes[idx],
        markSum: movie.marks.length,
        clipSum: movie.clips.length,
        markId: markId[idx],
        score: score[idx],
        content: content[idx],
        userId: user.id,
        markUserId: markUserId[idx],
        nickname: user.nickname,
        ave,
        initialState,
        favoBool: LoggedFavoBools[idx],
        markFavoSum: markFavoSum[idx],
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
                        <Grid item md={6} sm={6} xs={4.7}>
                          <MediaQuery query="(min-width: 550px)">
                            <Box display="flex">
                              <IconButton>
                                <Link to={`/user/${ary.userId}/profile`}>
                                  <Avatar
                                    alt={ary.nickname}
                                    src={src}
                                    sx={{ width: 32, height: 32 }}
                                  ></Avatar>
                                </Link>
                              </IconButton>
                              <Link to={`/user/${ary.userId}/profile`}>
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
                                  {ary.nickname}
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
                                <Link to={`/user/${ary.userId}/profile`}>
                                  <Avatar
                                    alt={ary.nickname}
                                    src={src}
                                    sx={{ width: 22, height: 22 }}
                                  ></Avatar>
                                </Link>
                              </IconButton>
                              <Link to={`/user/${ary.userId}/profile`}>
                                <Typography
                                  sx={{
                                    ml: 1,
                                    pt: 1.5,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontFamily: "arial, sans-serif",
                                    color: "black",
                                  }}
                                  fontSize="0.6rem"
                                >
                                  {ary.nickname}
                                </Typography>
                              </Link>
                            </Box>
                            <Typography
                              sx={{
                                maxWidth: 200,
                                fontSize: "0.8rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontFamily: `'Vollkorn', serif`,
                              }}
                            >
                              {ary.movie.movieName}
                            </Typography>
                            <Stars
                              value={ary.score}
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
                              <Typography fontSize="0.6rem">{ary.content}</Typography>
                            </Scrollbars>
                          </MediaQuery>

                          <CreateFavoIcon
                            favoSum={ary.markFavoSum}
                            auth={parseInt(authState.id)}
                            markStrId={ary.markId}
                            favoBool={ary.favoBool}
                          />
                          <CreateCommentIcon info={ary} markId={ary.markId} />
                          {ary.markComme}
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
                          {ary.markUserId === authState.id ? (
                            <MarkThreeVertIcon markId={ary.markId} userId={authState.id} />
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
