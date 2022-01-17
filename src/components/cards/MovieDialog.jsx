import {
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Stars } from "../Stars";
import { ScrollBar } from "../ScrollBar";
import { Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CreateMarkIcon } from "../../graphql/CreateMark";
import { useContext } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { MarksSection } from "./MarksSection";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, releaseYear, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, display: "flex", minWidth: "40%" }} {...other}>
      <Typography variant="h5" sx={{ pr: 2 }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="body1" sx={{ pt: 1, alignItems: "flex-end" }}>
        Released in {releaseYear}
      </Typography>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function MovieDialog(props) {
  const { propsDialog } = props;
  const {
    handleClose,
    open,
    image,
    movie,
    score,
    count,
    countSetState,
    clickClip,
    clipped,
    clipSetState,
    createClip,
    unClickClip,
    deleteClip,
    mark,
  } = propsDialog;
  const {
    id,
    movieName,
    summary,
    runningTime,
    releaseYear,
    releaseDate,
    country,
    category,
    releaseState,
  } = movie;
  const authState = useContext(UserAuthContext);
  const userId = authState.id;
  return (
    <>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          releaseYear={releaseYear}
        >
          {movieName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spaceing={1}>
            <Grid item md={5}>
              <img
                src={image}
                alt={movieName}
                style={{ width: "200px", height: "300px", objectFit: "cover" }}
              />
              <CreateMarkIcon userId={userId} movieId={id} movie={movie} />
              {mark}
              {clipped ? (
                <>
                  <IconButton
                    // size={size}
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
                    // size={size}
                    color="inherit"
                    onClick={async () => {
                      countSetState(clickClip);
                      await createClip();
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
              <Typography variant="subtitle1">Release date: {releaseDate}</Typography>
              <Typography variant="subtitle1">Country: {country}</Typography>
              <Typography variant="subtitle1">Running Time: {runningTime}min</Typography>
              <Typography variant="subtitle1">
                Genre:
                <Typography variant="title" color="inherit" noWrap>
                  &nbsp;
                </Typography>
                <Link to="/">{category}</Link>
              </Typography>
              <div>
                <Stars value={score} />
              </div>
              <Typography variant="subtitle1">Summary</Typography>
              <ScrollBar content={summary} />
              <Typography noWrap mt={2}>
                current: {releaseState}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MarksSection movieId={movie.id} />
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
