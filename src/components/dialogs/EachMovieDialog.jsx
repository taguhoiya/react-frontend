import { DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import { memo, useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link } from "react-router-dom";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { CreateClipIcon } from "../../graphql/CreateClip";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import { Stars } from "../Stars";
import { MarksSection } from "../cards/MarksSection";
import { BootstrapDialog, BootstrapDialogTitle } from "./MovieDialog";
import { UserAuthContext } from "../providers/UserAuthProvider";

export const EachMovieDialog = memo((props) => {
  const { handleClose, open, score, movie, markSum, initialState, clipSum } = props;
  const { authState } = useContext(UserAuthContext);
  const userId = authState.id;
  return (
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
              src={stock1}
              alt={movie.movieName}
              style={{ width: "80%", height: "100%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <div>
              <CreateMarkIcon userId={userId} vert={false} markSum={markSum} />
              <CreateClipIcon
                vert={false}
                initialState={initialState}
                clipSum={clipSum}
                movieId={movie.id}
              />
            </div>
            <div>
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
  );
});
