import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientAuth } from "../../components/client";
import { Loader } from "../../components/Loader";
import { UserAuthContext } from "../../components/providers/UserAuthProvider";
import { USER_LOGOUT } from "../../graphql/queries.jsx";
import { useAlert } from "react-alert";

export const Logout = (props) => {
  const { setAuthState } = useContext(UserAuthContext);
  const alert = useAlert();
  const navigate = useNavigate();
  const [logout, { client, loading, data }] = useMutation(USER_LOGOUT, {
    client: clientAuth,
    update: (_proxy, response, data) => {
      if (!response.errors) {
        localStorage.clear();
        client.resetStore();
        setAuthState(0);
        navigate("/login", { replace: true });
      } else {
        alert("Logout failed");
        navigate("/movies/1", { replace: true });
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
  if (loading) return null;
  if (data) return <Loader state={false} />;
  return (
    <>
      <Button variant="outlined" size="small" sx={{ mx: "6px" }} onClick={handleClickOpen}>
        {props.children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center">
          Are you sure?
        </DialogTitle>
        <DialogActions sx={{ margin: "auto" }}>
          <Button onClick={logout} color="primary">
            LOGOUT
          </Button>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
