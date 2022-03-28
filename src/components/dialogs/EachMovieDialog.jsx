import { DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import { memo, useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateClipIcon } from "../../graphql/CreateClip";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import { Stars } from "../accessories/Stars";
import { MarksSection } from "../cards/MarksSection";
import { UserAuthContext } from "../providers/UserAuthProvider";
import MediaQuery from "react-responsive";
import { BootstrapDialog, BootstrapDialogTitle } from "./MovieDialog";
import { MOVIE_CATEGORY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Loader } from "../accessories/Loader";

export const EachMovieDialog = memo((props) => {
  const { handleClose, open, score, movie, markSum, initialState, clipSum } = props;
  const { authState } = useContext(UserAuthContext);
  const userId = authState.id;
  const { loading, error, data } = useQuery(MOVIE_CATEGORY, {
    variables: { movieId: movie.id },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const { movieCategory } = data;
    const categories = Object.entries(movieCategory).map((category) => {
      if (category[1] === true) return category[0];
      else return null
    });
    const category = categories.filter(function (fac) {
      return fac !== undefined;
    });
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
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
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
                  <Typography fontSize="0.9rem">Runtime: {movie.runtime}min</Typography>
                  <Typography fontSize="0.9rem">
                    Genre:
                    <Typography variant="title" color="inherit" noWrap>
                      &nbsp;
                    </Typography>
                    {category.map((cate) => {
                      if (cate === "scienceFiction") return <>SF&nbsp;</>;
                      else if (cate === "tvMovie") return <>TV movie&nbsp;</>;
                      else return <>{cate}&nbsp;</>;
                    })}
                  </Typography>
                  <div>
                    <Stars value={!score ? 0 : score} size={20} starNum={true} />
                  </div>
                  <Typography fontSize="0.9rem" my={1.5}>
                    Summary
                  </Typography>
                  <Scrollbars autoHeight autoHeightMin={80} autoHeightMax={80}>
                    <Typography fontSize="0.8rem">{movie.summary}</Typography>
                  </Scrollbars>
                  <Typography noWrap mt={3} fontSize="0.9rem">
                    <a href={movie.homepage} target="_blank" rel="noreferrer">
                      Watch it anyway
                    </a>
                  </Typography>
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
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
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
                  <Typography fontSize="0.6rem">Runtime: {movie.runtime}min</Typography>
                  <Typography fontSize="0.6rem">
                    Genre:
                    <Typography variant="title" color="inherit" noWrap>
                      &nbsp;
                    </Typography>
                    {category.map((cate) => {
                      if (cate === "scienceFiction") return <>SF&nbsp;</>;
                      else if (cate === "tvMovie") return <>TV movie&nbsp;</>;
                      else return <>{cate}&nbsp;</>;
                    })}
                  </Typography>
                  <div>
                    <Stars
                      value={!score ? 0 : score}
                      size={14}
                      starNum={true}
                      typo="0.8rem"
                      pt="1px"
                    />
                  </div>
                  <Typography fontSize="0.6rem">Summary</Typography>
                  <Scrollbars autoHeight autoHeightMin={50} autoHeightMax={70}>
                    <Typography fontSize="0.5rem">{movie.summary}</Typography>
                  </Scrollbars>
                  <Typography noWrap mt={0.5} fontSize="0.6rem">
                    <a href={movie.homepage} target="_blank" rel="noreferrer">
                      Watch it anyway
                    </a>
                  </Typography>
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
  }
});
