import { useMutation } from "@apollo/client";

import {
  Alert,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { memo, useCallback, useState } from "react";
import { Loader } from "../components/Loader";
import MarkIcon from "@mui/icons-material/RateReview";
import { CREATE_MARK } from "./mutations";
import { InputSlider } from "../components/RangeSlider";
import { GrowTransition } from "../containers/auth/Verify";

export const CreateMarkIcon = memo((props) => {
  const { userId, size, movie, markCount, setMarkCount } = props;
  const [value, setValue] = useState(2.5);
  const [markInput, setMarkInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(true);

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const addMarkCount = useCallback(() => {
    setMarkCount((prev) => prev + 1);
  }, [markCount]);

  const [createMark, { data, error, loading }] = useMutation(CREATE_MARK, {
    variables: { movieId: movie.id, userId, score: value, content: markInput },
  });

  if (loading) return <Loader state={false} />;
  return (
    <>
      {!error ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={1500}
          onClose={handleCloseBar}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            The Content is not written! Post again!
          </Alert>
        </Snackbar>
      )}
      <IconButton size={size} color="inherit" onClick={handleClickOpen}>
        <Badge color="secondary">
          <MarkIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center">
          Add review of {movie.movieName}
        </DialogTitle>
        <InputSlider setValue={setValue} value={value} />
        <DialogContent>
          <TextField
            label="Mark"
            margin="dense"
            fullWidth
            id="text"
            name="mark"
            multiline
            maxRows="12"
            onChange={(e) => {
              setMarkInput(e.target.value);
            }}
            type="text"
          />
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button
            onClick={() => {
              if (data) {
                addMarkCount();
              }
              createMark();
              handleClose();
              if (error) setOpenB(!openB);
            }}
            color="primary"
          >
            ADD
          </Button>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
