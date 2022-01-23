import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-spinners/PuffLoader";
import { clientAuth } from "../../components/client";
import { UserAuthContext } from "../../components/providers/UserAuthProvider";
import { USER_LOGOUT } from "../../graphql/queries.jsx";

export const Logout = memo(() => {
  const { setAuthState } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const [logout, { client, loading, error }] = useMutation(USER_LOGOUT, {
    client: clientAuth,
    update: (_proxy, response) => {
      if (!response.errors) {
        localStorage.clear();
        client.resetStore();
        setAuthState(0);
        navigate("/login", { replace: true });
      }
    },
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  if (loading) return <Loader state={true} />;
  if (error) {
    localStorage.clear();
    client.resetStore();
    setAuthState(0);
    navigate("/login", { replace: true });
  }
  return (
    <>
      <Button variant="outlined" size="small" sx={{ mx: "6px" }} onClick={handleClickOpen}>
        LOGOUT
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
});
