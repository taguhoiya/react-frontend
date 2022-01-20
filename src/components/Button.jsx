import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

export const AuthButton = (props) => {
  const { nickname, email, password, passwordConfirmation, setFormState } = props;
  const [loadingB, setLoadingB] = useState(false);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  const [register, { error }] = useMutation(USER_REGISTER, {
    variables: { nickname, email, password, passwordConfirmation },
    client: clientAuth,
    update: (_proxy, response) => {
      const { id } = response.data.userRegister.user;
      if (!response.errors) {
        localStorage.setItem("id", id);
      } else {
        window.alert("ログイン情報が不正です。");
        setFormState({ email: "", password: "" });
      }
    },
  });
  const timer = useRef();
  const handleButtonClick = () => {
    if (error) {
      console.log(error)
      timer.current = window.setTimeout(() => {
        window.alert("Sent Email to your address. Please confirm it!");
      }, 500);
    } else {
      timer.current = window.setTimeout(() => {
        window.alert("Registration failed");
        setLoadingB(false);
      }, 500);
    }
  };
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loadingB}
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          setLoadingB(true);
          register();
          handleButtonClick();
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
