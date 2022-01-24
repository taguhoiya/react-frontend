import { useCallback, useContext, useState } from "react";
import {
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Card,
  CardContent,
  Badge,
  IconButton,
  Box,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { CreateClipIcon } from "../../graphql/CreateClip";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { EachMovieDialog } from "../dialogs/EachMovieDialog";
import MediaQuery from "react-responsive";

export const CustomCard = (props) => {
  const { classes, info, size, ave, movie, markSum, initialState, clipSum, movieId, star } = props;
  const [open, setOpen] = useState(false);
  const { authState } = useContext(UserAuthContext);
  const userId = authState.id;
  const score = Number.isNaN(ave) ? 0 : ave;
  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  return (
    <>
      <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardMedia component="img" height={160} image={stock1} onClick={handleClickOpen} />
          <EachMovieDialog
            info={info}
            open={open}
            handleClose={handleClose}
            score={ave}
            movie={movie}
            markSum={markSum}
            clipSum={clipSum}
            initialState={initialState}
          />
          <CardContent className={classes.content} onClick={handleClickOpen}>
            <Typography className={classes.title} variant="h2">
              {movie.movieName}
            </Typography>
          </CardContent>
          <Grid container className={classes.cardPosition} justifyContent="center">
            <MediaQuery query="(min-width: 480px)">
              <Grid item xs={4} className={classes.cardContent}>
                <CreateMarkIcon
                  size={size}
                  userId={userId}
                  vert={true}
                  markSum={markSum}
                  movieId={movie.id}
                  movieName={movie.movieName}
                />
              </Grid>
              <Grid item xs={4} className={classes.cardContent}>
                <CreateClipIcon
                  size={size}
                  vert={true}
                  clipSum={clipSum}
                  movieId={movieId}
                  initialState={initialState}
                />
              </Grid>
              <Grid item xs={4}>
                <IconButton size={size} className={classes.rootBtn} disabled>
                  <Badge color="secondary">
                    <StarIcon sx={{ color: yellow[700] }} />
                  </Badge>
                </IconButton>
                <Box>{score}</Box>
              </Grid>
            </MediaQuery>
            <MediaQuery query="(max-width: 480px)">
              <Grid item xs={4} className={classes.cardContent}>
                <CreateMarkIcon
                  size={size}
                  userId={userId}
                  vert={true}
                  markSum={markSum}
                  movieId={movie.id}
                  movieName={movie.movieName}
                />
              </Grid>
              <Grid item xs={4} className={classes.cardContent}>
                <CreateClipIcon
                  size={size}
                  vert={true}
                  clipSum={clipSum}
                  movieId={movieId}
                  initialState={initialState}
                />
              </Grid>
              {!star ? null : (
                <Grid item xs={4}>
                  <IconButton size={size} className={classes.rootBtn} disabled>
                    <Badge color="secondary">
                      <StarIcon sx={{ color: yellow[700] }} />
                    </Badge>
                  </IconButton>
                  <Box>{score}</Box>
                </Grid>
              )}
            </MediaQuery>
          </Grid>
        </Card>
      </CardActionArea>
    </>
  );
};
