import { useCallback, useState } from "react";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
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
  DialogContent,
  Link,
  DialogActions,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import { CREATE_CLIP, DELETE_CLIP } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { BootstrapDialog, BootstrapDialogTitle } from "./MovieDialog";
import { Stars } from "../Stars";
import Scrollbars from "react-custom-scrollbars-2";
import { MarksSection } from "./MarksSection"

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

  const clickClip = useCallback(() => {
    countSetState((prev) => prev + 1);
  }, []);
  const unClickClip = useCallback(() => {
    countSetState((prev) => prev - 1);
  }, []);
  const [open, setOpen] = useState(false);
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
          <CardMedia
            classes={mediaStyles}
            image={image}
            style={{ height: "60%" }}
            onClick={handleClickOpen}
          />
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
              releaseYear={movie.releaseYear}
            >
              {movie.movieName}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Grid container spaceing={1}>
                <Grid item md={5}>
                  <img
                    src={image}
                    alt={movie.movieName}
                    style={{ width: "200px", height: "300px", objectFit: "cover" }}
                  />
                  <CreateMarkIcon userId={userId} movieId={movie.id} movie={movie} />
                  {mark}
                  {clipped ? (
                    <>
                      <IconButton
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
                        color="inherit"
                        onClick={() => {
                          countSetState(clickClip);
                          createClip();
                          clipSetState(!clipped);
                          window.location.reload();
                        }}
                      >
                        <Badge color="secondary">
                          <BookmarkBorderIcon />
                        </Badge>
                      </IconButton>
                    </>
                  )}
                  {count}
                </Grid>
                <Grid item md={7}>
                  <Typography variant="subtitle1">Release date: {movie.releaseDate}</Typography>
                  <Typography variant="subtitle1">Country: {movie.country}</Typography>
                  <Typography variant="subtitle1">Running Time: {movie.runningTime}min</Typography>
                  <Typography variant="subtitle1">
                    Genre:
                    <Typography variant="title" color="inherit" noWrap>
                      &nbsp;
                    </Typography>
                    <Link to="/">{movie.category}</Link>
                  </Typography>
                  <div>
                    <Stars value={movie.score} />
                  </div>
                  <Typography variant="subtitle1">Summary</Typography>
                  <Scrollbars content={movie.summary} />
                  <Typography noWrap mt={2}>
                    current: {movie.releaseState}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <MarksSection movieId={movie.id} />
            </DialogActions>
          </BootstrapDialog>
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
        )
      </CardActionArea>
    </>
  );
};
