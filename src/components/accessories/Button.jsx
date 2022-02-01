import Button from "@mui/material/Button";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { Dropdown } from "../userProfile/Dropdowns";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_IMAGE } from "../../graphql/mutations";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { clientAuth, clientUpload } from "../../graphql/client";
import { useContext } from "react";
import { purple } from "@mui/material/colors";
import { USER_REGISTER } from "../../graphql/queries";
import { GrowTransition } from "../../containers/Verify";
import MediaQuery from "react-responsive";
import { UserInfoContext } from "../providers/UserInfoProvider";

export const AuthButton = (props) => {
  const { nickname, email, password, passwordConfirmation } = props;
  const [loadingB, setLoadingB] = useState(false);
  const [open, setOpen] = useState(true);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoadingB(false);
    setOpen(false);
    localStorage.clear();
  };

  const [register, { error }] = useMutation(USER_REGISTER, {
    variables: { nickname, email, password, passwordConfirmation },
    client: clientAuth,
    update: (_proxy, response) => {
      const { id } = response.data.userRegister.user;
      if (!response.errors) {
        window.alert("Sent Email. Please Confirm it!");
        localStorage.setItem("id", parseInt(id));
        setLoadingB(false);
      }
    },
  });

  return (
    <>
      {!error ? null : (
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            Register Failed.
          </Alert>
        </Snackbar>
      )}
      <Button
        color="warning"
        type="submit"
        fullWidth
        variant="contained"
        disabled={loadingB}
        sx={{ mt: 3, mb: 2 }}
        onClick={(e) => {
          e.preventDefault();
          setLoadingB(true);
          register();
          if (error) setOpen(!open);
        }}
      >
        {props.children}
      </Button>
      {loadingB && (
        <CircularProgress
          size={20}
          sx={{
            color: purple[500],
            position: "absolute",
            left: "50%",
            mt: 4,
          }}
        />
      )}
    </>
  );
};

export const AuthHeaderButton = memo((props) => {
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        component={Link}
        to={props.to}
        sx={{ mx: "6px" }}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </>
  );
});

export const EditProfile = memo(() => {
  const { nickname, src, params } = useContext(UserInfoContext);
  const { authState } = useContext(UserAuthContext);
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(true);
  const [nameState, setNameState] = useState(nickname);
  const [imageState, setImageState] = useState(src);
  const [updateUserImage, { data, error }] = useMutation(UPDATE_USER_IMAGE, {
    variables: { image: imageState.postImage, id: authState.id, nickname: nameState },
    client: clientUpload,
    update: (_proxy, response) => {
      if (!response.errors) {
        setTimeout(() => {}, 2000);
      }
    },
  });
  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClickClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleCloseS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenB(false);
    window.location.reload();
  };
  const handleCloseB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenB(false);
  };
  const handleUpdateImage = useCallback(() => {
    setOpenB(true);
    updateUserImage();
    handleClickClose();
  }, []);
  return (
    <>
      {!error ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={2000}
          onClose={handleCloseB}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            There's something wrong! Update agein correctly!
          </Alert>
        </Snackbar>
      )}
      {!data ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={2000}
          onClose={handleCloseS}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Updated successfully!
          </Alert>
        </Snackbar>
      )}
      {authState.id == params ? (
        <>
          <MediaQuery query="(min-width: 768px)">
            <Button
              variant="outlined"
              align="center"
              size="medium"
              sx={{ mt: 10 }}
              onClick={handleClickOpen}
              color="warning"
            >
              Edit Profile
            </Button>
          </MediaQuery>
          <MediaQuery query="(max-width: 768px)">
            <Button
              variant="outlined"
              align="center"
              size="small"
              color="warning"
              sx={{ mt: 10 }}
              onClick={handleClickOpen}
            >
              Edit Profile
            </Button>
          </MediaQuery>
        </>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClickClose}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center"></DialogTitle>
        <DialogContent align="center">
          <Avatar
            sx={{ width: 150, height: 150, marginBottom: 0.5 }}
            alt="icon"
            src={!imageState.image ? imageState : imageState.image}
          />
          <Dropdown setImageState={setImageState} imageState={imageState} />
          <TextField
            required
            margin="dense"
            id="name"
            label="Update Nickname?"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={nameState}
            onChange={(e) => setNameState(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button onClick={handleUpdateImage} color="warning">
            UPDATE
          </Button>
          <Button onClick={handleClickClose} color="warning">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
