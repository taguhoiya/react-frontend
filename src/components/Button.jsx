import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { Dropdown } from "./UserProfile/Dropdowns";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_IMAGE } from "../graphql/mutations";
import { UserAuthContext } from "./providers/UserAuthProvider";
import { clientAuth, clientUpload } from "./client";
import { useContext } from "react";
import { blue } from "@mui/material/colors";
import { USER_REGISTER } from "../graphql/queries";
import { GrowTransition } from "../containers/auth/Verify";

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
      const { id } = data.userRegister.user;
      if (!response.errors) {
        window.alert("Sent Email. Please Confirm it!");
        localStorage.setItem("id", id);
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
            color: blue[500],
            position: "absolute",
            left: "50%",
            mt: 4,
          }}
        />
      )}
    </>
  );
};

export const AuthHeaderButton = (props) => {
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
};

export const LogoutButton = (props) => {
  const [, setAction] = useState("");
  const alert = useAlert();
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{ mx: "6px" }}
      onClick={() => {
        alert.show("This is an alert with extra actions!", {
          title: "Alert with extra actions!",
          actions: [
            {
              copy: "Do something",
              onClick: () => setAction(window.location.reload()),
            },
          ],
        });
      }}
    >
      {props.children}
    </Button>
  );
};

export const EditProfile = (props) => {
  const [open, setOpen] = useState(false);
  const [imageState, setImageState] = useState(props.image);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { authState } = useContext(UserAuthContext);
  const [updateUserImage] = useMutation(UPDATE_USER_IMAGE, {
    variables: { image: imageState.postImage, id: authState.id },
    client: clientUpload,
    update: (_proxy, response) => {
      if (!response.errors) {
        window.location.reload();
      } else {
        alert("Upload failed");
        setImageState({ image: {} });
      }
    },
  });
  return (
    <>
      <Button
        variant="outlined"
        align="center"
        size="large"
        sx={{ mt: "100px" }}
        onClick={handleClickOpen}
      >
        {props.children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center"></DialogTitle>
        <DialogContent align="center">
          <img
            src={!imageState.image ? imageState : imageState.image}
            alt="アイコン"
            height="150px"
            width="150px"
            style={{ borderRadius: "50%" }}
          />
          <Dropdown setImageState={setImageState} imageState={imageState} />
          <TextField
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue="Default Value"
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button onClick={updateUserImage} color="primary">
            UPDATE
          </Button>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
