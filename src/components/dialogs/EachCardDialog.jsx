import {
  Badge,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import { Stars } from "../accessories/Stars";
import { MarksSection } from "../cards/MarksSection";
import Scrollbars from "react-custom-scrollbars-2";
import { memo, useCallback, useContext, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CLIP, DELETE_CLIP } from "../../graphql/mutations";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { MOVIE_CATEGORY } from "../../graphql/queries";
import { Loader } from "../accessories/Loader";

export const EachCardDialog = memo((props) => {
  const { info, markCount, initialState, clip } = props;
  const { authState } = useContext(UserAuthContext);
  const userId = authState.id;
  const [markCountState, setMarkCount] = useState(markCount);
  const [clipped, clipSetState] = useState(initialState);
  const [countClip, countSetClip] = useState(clip);
  const [createClip] = useMutation(CREATE_CLIP, {
    variables: { userId, movieId: info.movie.id }, // movieId変更
  });
  const [deleteClip] = useMutation(DELETE_CLIP, {
    variables: { userId, movieId: info.movie.id },
  });
  const clickClip = useCallback(() => {
    countSetClip((prev) => prev + 1);
    clipSetState((prev) => !prev);
    createClip();
  }, []);
  const unClickClip = useCallback(() => {
    countSetClip((prev) => prev - 1);
    clipSetState((prev) => !prev);
    deleteClip();
  }, []);

  const { loading, error, data } = useQuery(MOVIE_CATEGORY, {
    variables: { movieId: info.movie.id },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    console.log(data);
    return (
      <>
        <DialogContent>
          <Grid container spaceing={0} alignItems="center">
            <Grid item xs={6} sm={6} md={6}>
              <img
                src={`https://image.tmdb.org/t/p/w500${info.movie.posterPath}`}
                alt={info.movie.movieName}
                style={{ width: "80%", height: "100%", objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <div>
                <CreateMarkIcon
                  userId={userId}
                  movie={info.movie}
                  markCount={markCountState}
                  setMarkCount={setMarkCount}
                />
                {markCountState}
                {clipped ? (
                  <>
                    <IconButton color="warning" onClick={unClickClip}>
                      <Badge color="secondary">
                        <BookmarkIcon />
                      </Badge>
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton color="inherit" onClick={clickClip}>
                      <Badge color="secondary">
                        <BookmarkBorderIcon />
                      </Badge>
                    </IconButton>
                  </>
                )}
                {countClip}
              </div>
              <div>
                <Typography variant="subtitle1">Release date: {info.movie.releaseDate}</Typography>
                <Typography variant="subtitle1">Country: {info.movie.country}</Typography>
                <Typography variant="subtitle1">Runtime: {info.movie.runtime}min</Typography>
                <Typography variant="subtitle1">
                  Genre:
                  <Typography variant="title" color="inherit" noWrap>
                    &nbsp;
                  </Typography>
                  <Link to="/">{info.movie.category}</Link>
                </Typography>
                <div>
                  <Stars value={Number.isNaN(info.ave) ? 0 : info.ave} starNum={true} />
                </div>
                <Typography variant="subtitle1">Summary</Typography>
                <Scrollbars autoHeight autoHeightMin={80} autoHeightMax={80}>
                  <Typography variant="body2">{info.movie.summary}</Typography>
                </Scrollbars>
                <Typography noWrap mt={2}>
                  current: {info.movie.releaseState}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MarksSection movieId={info.movie.id} />
        </DialogActions>
      </>
    );
  }
});
