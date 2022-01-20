import { useMutation } from "@apollo/client";
import { Alert, Grow, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientAuth } from "../../components/client";

import { USER_LOGIN } from "../../graphql/queries";

export function GrowTransition(props) {
  return <Grow {...props} />;
}

export const Verify = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    login();
    setOpen(false);
  };
  const [login] = useMutation(USER_LOGIN, {
    variables: { email, password },
    client: clientAuth,
    update: (_proxy, response) => {
      const { accessToken, client, uid } = response.data.userLogin.credentials;
      const { id } = response.data.userLogin.user;
      if (!response.errors) {
        localStorage.clear();
        localStorage.setItem("id", id);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        navigate("/movies/1");
        window.location.reload();
      } else {
        window.alert("You are not confirmed");
        localStorage.clear();
        navigate("/login");
      }
    },
  });
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionComponent={GrowTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ width: 400, height: 200 }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          You are confirmed!
        </Alert>
      </Snackbar>
    </>
  );
};
