import { useMutation, useQuery } from "@apollo/client";
import { Alert, Grow, Snackbar } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { clientAuth } from "../../components/client";
import { Loader } from "../../components/Loader";
import { LOGGED_USER, USER_LOGIN } from "../../graphql/queries";

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
        navigate("/");
        window.location.reload();
      } else {
        window.alert("You are not confirmed");
        localStorage.clear();
        navigate("/login");
      }
    },
  });
  const {
    loading: loadA,
    error: errorA,
    // data: dataA,
  } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(localStorage.getItem("id")) },
    client: clientAuth,
    fetchPolicy: "network-only",
  });
  if (loadA) {
    return <Loader state={true} />;
  }
  if (errorA) {
    return <Navigate to="/login" />;
  }
  if (dataA) {
    const valid = dataA.publicUser.confirmedAt;
    if (valid)
      return (
        <>
          <Loader state={false} />
          <Navigate to="/" />
        </>
      );
  }
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
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
