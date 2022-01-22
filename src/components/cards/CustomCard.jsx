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
import { MarksSection } from "./MarksSection";
import Scrollbars from "react-custom-scrollbars-2";

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
  const [countClip, countSetClip] = useState(clip);
  const [clipped, clipSetState] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [markCount, setMarkCount] = useState(mark);
  const userId = auth;
  const movieId = parseInt(id);
  const [createClip] = useMutation(CREATE_CLIP, {
    variables: { userId, movieId },
  });
  const [deleteClip] = useMutation(DELETE_CLIP, {
    variables: { userId, movieId },
  });
  const clickClip = useCallback(() => {
    countSetClip((prev) => prev + 1);
    clipSetState((prev) => !prev);
  }, []);
  const unClickClip = useCallback(() => {
    countSetClip((prev) => prev - 1);
    clipSetState((prev) => !prev);
  }, []);
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
            styles={{ maxWidth: "60%" }}
          >
            <BootstrapDialogTitle
              id="customized-dialo g-title"
              onClose={handleClose}
              releaseYear={movie.releaseYear}
            >
              {movie.movieName}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Grid container spaceing={0} alignItems="center">
                <Grid item xs={6} sm={6} md={6}>
                  <img
                    src={image}
                    alt={movie.movieName}
                    style={{ width: "80%", height: "100%", objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <div>
                    <CreateMarkIcon
                      userId={userId}
                      movie={movie}
                      markCount={markCount}
                      setMarkCount={setMarkCount}
                    />
                    {markCount}
                    {clipped ? (
                      <>
                        <IconButton
                          color="warning"
                          onClick={() => {
                            unClickClip();
                            deleteClip();
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
                            clickClip();
                            createClip();
                          }}
                        >
                          <Badge color="secondary">
                            <BookmarkBorderIcon />
                          </Badge>
                        </IconButton>
                      </>
                    )}
                    {countClip}
                  </div>
                  <div>
                    <Typography variant="subtitle1">Release date: {movie.releaseDate}</Typography>
                    <Typography variant="subtitle1">Country: {movie.country}</Typography>
                    <Typography variant="subtitle1">
                      Running Time: {movie.runningTime}min
                    </Typography>
                    <Typography variant="subtitle1">
                      Genre:
                      <Typography variant="title" color="inherit" noWrap>
                        &nbsp;
                      </Typography>
                      <Link to="/">{movie.category}</Link>
                    </Typography>
                    <div>
                      <Stars value={score} />
                    </div>
                    <Typography variant="subtitle1">Summary</Typography>
                    <Scrollbars autoHeight autoHeightMin={80} autoHeightMax={80}>
                      <Typography variant="body2">{movie.summary}</Typography>
                    </Scrollbars>
                    <Typography noWrap mt={2}>
                      current: {movie.releaseState}
                    </Typography>
                  </div>
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
              <Box>{markCount}</Box>
            </Grid>
            <Grid item xs={4}>
              {clipped ? (
                <>
                  <IconButton
                    size={size}
                    color="warning"
                    onClick={() => {
                      unClickClip();
                      deleteClip();
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
                      clickClip();
                      createClip();
                    }}
                  >
                    <Badge color="secondary">
                      <BookmarkBorderIcon />
                    </Badge>
                  </IconButton>
                </>
              )}
              <Box>{countClip}</Box>
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
      </CardActionArea>
    </>
  );
};
