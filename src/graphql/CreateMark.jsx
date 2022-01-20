import { useMutation } from "@apollo/client";

import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Loader } from "../components/Loader";
import MarkIcon from "@mui/icons-material/RateReview";
import { CREATE_MARK } from "./mutations";
import { InputSlider } from "../components/RangeSlider";
import { useNavigate } from "react-router-dom";

export const CreateMarkIcon = (props) => {
  const { movieId, userId, size, movie } = props;
  const [value, setValue] = useState(2.5);
  const [mark, setMark] = useState("");
  const navigate = useNavigate();
  const [createMark, { data, loading }] = useMutation(CREATE_MARK, {
    variables: { movieId, userId, score: value, content: mark },
    update: (_proxy, response) => {
      if (!response.errors) {
        return null;
      } else {
        navigate("/", { replace: true });
        alert("Failed");
        window.location.reload();
      }
    },
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (loading) return <Loader state={true} />;
  if (data) return <Loader state={false} />;
  return (
    <>
      <Loader state={false} />
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
            defaultValue={mark}
            onChange={(e) => {
              setMark(e.target.value);
            }}
            type="text"
          />
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button
            onClick={() => {
              createMark();
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
};
