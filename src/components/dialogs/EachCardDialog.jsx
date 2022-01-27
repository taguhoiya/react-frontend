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
import { Stars } from "../Stars";
import { MarksSection } from "../cards/MarksSection";
import Scrollbars from "react-custom-scrollbars-2";
import { memo, useCallback, useContext, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { useMutation } from "@apollo/client";
import { CREATE_CLIP, DELETE_CLIP } from "../../graphql/mutations";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

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
  return (
    <>
      <DialogContent>
        <Grid container spaceing={0} alignItems="center">
          <Grid item xs={6} sm={6} md={6}>
            <img
              src={stock1}
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
              <Typography variant="subtitle1">Running Time: {info.movie.runningTime}min</Typography>
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
});
