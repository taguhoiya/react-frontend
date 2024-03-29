import { useQuery } from "@apollo/client";
import { Avatar, Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { MOVIES } from "../../graphql/queries";
import { CustomCard } from "./CustomCard";
import { cardStyles2, cardStyles5 } from "./CardStyles";
import { memo, useContext } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { average } from "../../Helper";
import { Stars } from "../accessories/Stars";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import Scrollbars from "react-custom-scrollbars-2";
import { BasicPagination } from "../userProfile/Pagination";
import { Loader } from "../accessories/Loader";
import { MarkThreeVertIcon } from "./MarkThreeVertIcon";
import MediaQuery from "react-responsive";
import defaultImage from "../../images/stock-photos/people-1.jpg";
import { Link } from "react-router-dom";

export const GetMovie = memo((props) => {
  const { markMovieIds, marks, user, setPage, page, count } = props;
  const styles = cardStyles2();
  const styles2 = cardStyles5();
  const { authState } = useContext(UserAuthContext);
  const users = marks.map((mark) => mark.user);
  const nicknames = users.map((user) => user.nickname);
  const usersPath = users.map((user) =>
    !user.path ? "" : `https://www.moview-ori.com${user.path}/`
  );
  const userId = users.map((user) => user.id);
  const favoIds = user.favorites.map((favo) => favo.mark.id);
  const markIds = marks.map((mark) => mark.id);
  const score = marks.map((mark) => mark.score);
  const content = marks.map((mark) => mark.content);
  const clippedMovieIds = user.clips.map((clip) => clip.movieId);
  const markFavo = marks.map((mark) => mark.favorites.length);
  const markComm = marks.map((mark) => mark.comments.length);
  const favoBools = markIds.map((markId) => favoIds.includes(markId));
  const markUserId = marks.map((mark) => mark.userId);
  const { error, loading, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
  });
  if (error) return `Error ${error.message}`;
  if (loading) return <Loader state={true} />;
  if (data) {
    const movies = data.movies;
    const ary = movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      const initialState = clippedMovieIds.includes(movie.id);
      const clipSum = movie.clips.length;
      const markSum = movie.marks.length;
      const id = parseInt(movie.id);
      return {
        movie,
        clipSum,
        markSum,
        ave,
        id,
        score: score[idx],
        markId: markIds[idx],
        content: content[idx],
        markFavo: markFavo[idx],
        markUserId: markUserId[idx],
        markComm: markComm[idx],
        initialState,
        favoBool: favoBools[idx],
        userPath: usersPath[idx],
        nickname: nicknames[idx],
        userId: userId[idx],
      };
    });

    return (
      <>
        <Loader state={false} />
        {ary.map((ary, index) => (
          <Grid item lg={5.5} md={5} sm={12} xs={12} key={index} my={2}>
            <Card className="card-box" sx={{ backgroundColor: "#fff", marginLeft: 2 }}>
              <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                <MediaQuery query="(min-width: 550px)">
                  <Grid item md={0.5} sm={1.5} xs={0.5} />
                  <Grid item md={7} sm={6} xs={4.7}>
                    <Box display="flex">
                      <IconButton>
                        <Link to={`/user/${ary.userId}/profile`}>
                          <Avatar
                            alt={ary.nickname}
                            src={!ary.userPath ? defaultImage : ary.userPath}
                            sx={{ width: 32, height: 32 }}
                          ></Avatar>
                        </Link>
                      </IconButton>
                      <Link to={`/user/${ary.userId}/profile`}>
                        <Typography
                          sx={{ ml: 1, pt: 2, fontFamily: "arial, sans-serif", color: "black" }}
                          fontSize="0.8rem"
                        >
                          {ary.nickname}
                        </Typography>
                      </Link>
                    </Box>
                    <Typography
                      sx={{
                        maxWidth: 400,
                        fontSize: "1.3rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontFamily: `arial, sans-serif`,
                      }}
                    >
                      {ary.movie.movieName}
                    </Typography>
                    <Stars value={ary.score} size={22} pt="5px" starNum={true} />
                    <Scrollbars
                      autoHeight
                      autoHeightMin={150}
                      autoHeightMax={150}
                      style={{
                        border: "1px solid rgba(192, 231, 231, 0.733)",
                        borderRadius: "10px",
                        paddingInline: "15px",
                      }}
                    >
                      <Typography fontSize="1.1rem">{ary.content}</Typography>
                    </Scrollbars>

                    <CreateFavoIcon
                      favoSum={ary.markFavo}
                      auth={parseInt(authState.id)}
                      markStrId={ary.markId}
                      favoBool={ary.favoBool}
                    />
                    <CreateCommentIcon info={ary} markId={ary.markId} />
                    {ary.markComm}
                  </Grid>
                  <Grid item md={3} sm={3} xs={5}>
                    <CustomCard
                      classes={styles}
                      info={ary}
                      size="small"
                      ave={ary.ave}
                      movie={ary.movie}
                      markSum={ary.markSum}
                      initialState={ary.initialState}
                      clipSum={ary.clipSum}
                      movieName={ary.movie.movieName}
                      movieId={ary.movie.id}
                    />
                  </Grid>
                  <Grid item md={0.5} sm={1.5} xs={0.2}>
                    {ary.markUserId == authState.id ? (
                      <MarkThreeVertIcon markId={ary.markId} userId={authState.id} />
                    ) : null}
                  </Grid>
                </MediaQuery>

                <MediaQuery query="(max-width: 550px)">
                  <Grid item md={0.5} sm={1.5} xs={0} />
                  <Grid item md={6} sm={6} xs={4.8}>
                    <Box display="flex">
                      <IconButton>
                        <Link to={`/user/${ary.userId}/profile`}>
                          <Avatar
                            alt={ary.nickname}
                            src={!ary.userPath ? defaultImage : ary.userPath}
                            sx={{ width: 22, height: 22 }}
                          ></Avatar>
                        </Link>
                      </IconButton>
                      <Link to={`/user/${ary.userId}/profile`}>
                        <Typography
                          sx={{ ml: 1, pt: 1.5, fontFamily: "arial, sans-serif", color: "black" }}
                          fontSize="0.5rem"
                        >
                          {ary.nickname}
                        </Typography>
                      </Link>
                    </Box>
                    <Typography
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontFamily: `'Vollkorn', serif`,
                      }}
                    >
                      {ary.movie.movieName}
                    </Typography>
                    <Stars value={ary.score} size={15} pt="0px" starNum={true} />
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
                    <CreateFavoIcon
                      favoSum={ary.markFavo}
                      auth={parseInt(authState.id)}
                      markStrId={ary.markId}
                      favoBool={ary.favoBool}
                      fontSize="small"
                    />
                    <CreateCommentIcon info={ary} markId={ary.markId} />
                    {ary.markComm}
                  </Grid>
                  <Grid item md={4.5} sm={3} xs={5}>
                    <CustomCard
                      classes={styles2}
                      info={ary}
                      size="small"
                      ave={ary.ave}
                      movie={ary.movie}
                      markSum={ary.markSum}
                      initialState={ary.initialState}
                      clipSum={ary.clipSum}
                      movieName={ary.movie.movieName}
                      movieId={ary.movie.id}
                    />
                  </Grid>
                  <Grid item md={0.5} sm={1.5} xs={0.2}>
                    {ary.markUserId == authState.id ? (
                      <MarkThreeVertIcon markId={ary.markId} userId={authState.id} />
                    ) : null}
                  </Grid>
                </MediaQuery>
              </Grid>
            </Card>
          </Grid>
        ))}
        {movies % 2 === 0 ? (
          <Grid
            item
            mt={3}
            style={{
              position: "relative",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <BasicPagination page={page} setPage={setPage} count={count} mark={true} />
          </Grid>
        ) : (
          <Grid container py={2}>
            <Grid
              item
              mt={3}
              style={{
                position: "relative",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <BasicPagination page={page} setPage={setPage} count={count} mark={true} />
            </Grid>
          </Grid>
        )}
      </>
    );
  }
});
