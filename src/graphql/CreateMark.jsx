import { useMutation } from "@apollo/client";
import {
  Alert,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import MarkIcon from "@mui/icons-material/RateReview";
import { CREATE_MARK } from "./mutations";
import { InputSlider } from "../components/accessories/RangeSlider";
import { GrowTransition } from "../containers/Verify.jsx";
import { UserInfoContext } from "../components/providers/UserInfoProvider";
import { DashBoardContext } from "../components/providers/DashBoardProvider";

export const CreateMarkIcon = memo((props) => {
  const { userId, size, vert, markSum, movieId, movieName, fontSize } = props;
  const { refetch } = useContext(UserInfoContext);
  const { refetchU, refetchDash } = useContext(DashBoardContext);

  const [value, setValue] = useState(2.5);
  const [markCount, setMarkCount] = useState(markSum);
  const [markInput, setMarkInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(true);

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    log();
    refetchDash ? refetchU() : refetch();
  };
  const handleCloseBarError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenB(false);
  };
  const log = useCallback(() => {
    setOpenB((prevState) => !prevState);
  }, []);
  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const addMarkCount = useCallback(() => {
    setMarkCount((prev) => prev + 1);
  }, []);

  const [createMark, { data, error, loading }] = useMutation(CREATE_MARK, {
    variables: { movieId, userId, score: value, content: markInput },
  });
  const handleAddMark = useCallback(() => {
    createMark();
    handleClose();
    if (data) addMarkCount();
    if (error) log();
  }, [addMarkCount, createMark, data, error, handleClose, log]);

  if (loading) return null;
  return (
    <>
      {!error ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={2000}
          onClose={handleCloseBarError}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            Cannot post again if you've done before!
          </Alert>
        </Snackbar>
      )}
      {!data ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={700}
          onClose={handleCloseBar}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Sucess!
          </Alert>
        </Snackbar>
      )}
      <IconButton size={size} color="inherit" onClick={handleClickOpen}>
        <Badge color="secondary">
          <MarkIcon fontSize={fontSize ? fontSize : "medium"} />
        </Badge>
      </IconButton>
      {vert ? <Box>{markCount}</Box> : markCount}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center">
          Add a review of {movieName}
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
            color="warning"
            onChange={(e) => {
              setMarkInput(e.target.value);
            }}
            type="text"
          />
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button onClick={handleAddMark} color="warning">
            ADD
          </Button>
          <Button onClick={handleClose} color="warning">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
