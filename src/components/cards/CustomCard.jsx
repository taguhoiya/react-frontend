import { useState } from "react";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import {
  CardActionArea,
  CardMedia,
  Skeleton,
  Typography,
  Grid,
  Card,
  CardContent,
  Badge,
  IconButton,
  Box,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import { CREATE_CLIP, DELETE_CLIP } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MovieDialog from "./MovieDialog";

export const CustomCard = ({
  classes,
  image,
  movie,
  score,
  mark,
  clip,
  id,
  auth,
  size,
  initialState,
}) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  const state = 1;
  const [count, countSetState] = useState(clip);
  const [clipped, clipSetState] = useState(initialState);
  const userId = auth;
  const movieId = parseInt(id);
  const [createClip] = useMutation(CREATE_CLIP, {
    variables: { userId, movieId },
  });
  const [deleteClip] = useMutation(DELETE_CLIP, {
    variables: { userId, movieId },
  });
  const clickClip = count + 1;
  const unClickClip = count - 1;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const propsDialog = {
    open: open,
    handleClose: handleClose,
    movie: movie,
    image: image,
    score: score,
    count: count,
    countSetState: countSetState,
    clickClip: clickClip,
    createClip: createClip,
    clipSetState: clipSetState,
    clipped: clipped,
    unClickClip: unClickClip,
    deleteClip: deleteClip,
    mark: mark,
  };
  return (
    <>
      <CardActionArea className={classes.actionArea}>
        {state === undefined ? (
          <>
            <Skeleton animation="wave" width={256} height={192} />
            <CardContent className={classes.content}>
              <Skeleton animation="wave" className={classes.title} variant="h2" />
            </CardContent>
          </>
        ) : (
          <Card className={classes.card}>
            <CardMedia
              classes={mediaStyles}
              image={image}
              style={{ height: "60%" }}
              onClick={handleClickOpen}
            />
            <MovieDialog propsDialog={propsDialog} />
            <CardContent className={classes.content} onClick={handleClickOpen}>
              <Typography className={classes.title} variant="h2">
                {movie.movieName}
              </Typography>
            </CardContent>
            <Grid container className={classes.cardPosition}>
              <Grid item xs={4} className={classes.cardContent}>
                <CreateMarkIcon size={size} userId={userId} movieId={movieId} movie={movie} />
                <Box>{mark}</Box>
              </Grid>
              <Grid item xs={4}>
                {clipped ? (
                  <>
                    <IconButton
                      size={size}
                      color="warning"
                      onClick={() => {
                        countSetState(unClickClip);
                        deleteClip();
                        clipSetState(!clipped);
                        window.location.reload();
                      }}
                    >
                      <Badge color="secondary">
                        <BookmarkIcon />
                      </Badge>
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      size={size}
                      color="inherit"
                      onClick={() => {
                        countSetState(clickClip);
                        createClip();
                        clipSetState(!clipped);
                      }}
                    >
                      <Badge color="secondary">
                        <BookmarkBorderIcon />
                      </Badge>
                    </IconButton>
                  </>
                )}
                <Box>{count}</Box>
              </Grid>
              <Grid item xs={4}>
                <IconButton size={size} className={classes.rootBtn} disabled>
                  <Badge color="secondary">
                    <StarIcon sx={{ color: yellow[700] }} />
                  </Badge>
                </IconButton>
                <Box>{score}</Box>
              </Grid>
            </Grid>
          </Card>
        )}
      </CardActionArea>
    </>
  );
};
