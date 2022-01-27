import { DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import { memo, useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link } from "react-router-dom";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { CreateClipIcon } from "../../graphql/CreateClip";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import { Stars } from "../Stars";
import { MarksSection } from "../cards/MarksSection";
import { UserAuthContext } from "../providers/UserAuthProvider";
import MediaQuery from "react-responsive";
import { BootstrapDialog, BootstrapDialogTitle } from "./MovieDialog";

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
      <MediaQuery query="(min-width: 550px)">
        <DialogContent>
          <Grid container spaceing={0} alignItems="center">
            <Grid item xs={6} sm={6} md={6}>
              <img
                src={stock1}
                alt={movie.movieName}
                style={{ width: "80%", objectFit: "cover" }}
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
                <Typography fontSize="0.9rem">Country: {movie.country}</Typography>
                <Typography fontSize="0.9rem">Running Time: {movie.runningTime}min</Typography>
                <Typography fontSize="0.9rem">
                  Genre:
                  <Typography variant="title" color="inherit" noWrap>
                    &nbsp;
                  </Typography>
                  <Link to="/">{movie.category}</Link>
                </Typography>
                <div>
                  <Stars value={score} size={20} starNum={true} />
                </div>
                <Typography fontSize="0.9rem">Summary</Typography>
                <Scrollbars autoHeight autoHeightMin={80} autoHeightMax={80}>
                  <Typography fontSize="0.8rem">{movie.summary}</Typography>
                </Scrollbars>
                <Typography noWrap mt={2} fontSize="0.9rem">
                  Current: {movie.releaseState}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MarksSection movieId={movie.id} />
        </DialogActions>
      </MediaQuery>
      <MediaQuery query="(max-width: 550px)">
        <DialogContent>
          <Grid container spaceing={0} alignItems="center">
            <Grid item xs={6.0} sm={6} md={6}>
              <img
                src={stock1}
                alt={movie.movieName}
                style={{ width: "90%", objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={6} sm={5} md={6}>
              <div>
                <CreateMarkIcon
                  userId={userId}
                  pt={0}
                  vert={false}
                  markSum={markSum}
                  fontSize="small"
                />
                <CreateClipIcon
                  vert={false}
                  initialState={initialState}
                  clipSum={clipSum}
                  movieId={movie.id}
                  fontSize="small"
                />
              </div>
              <div>
                <Typography fontSize="0.6rem">Country: {movie.country}</Typography>
                <Typography fontSize="0.6rem">Running Time: {movie.runningTime}min</Typography>
                <Typography fontSize="0.6rem">
                  Genre:
                  <Typography variant="title" color="inherit" noWrap>
                    &nbsp;
                  </Typography>
                  <Link to="/">{movie.category}</Link>
                </Typography>
                <div>
                  <Stars value={score} size={14} starNum={true} typo="0.8rem" pt="1px" />
                </div>
                <Typography fontSize="0.6rem">Summary</Typography>
                <Scrollbars autoHeight autoHeightMin={50} autoHeightMax={70}>
                  <Typography fontSize="0.5rem">{movie.summary}</Typography>
                </Scrollbars>
                <Typography noWrap mt={0.5} fontSize="0.6rem">
                  Current: {movie.releaseState}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MarksSection movieId={movie.id} />
        </DialogActions>
      </MediaQuery>
    </BootstrapDialog>
  );
});
