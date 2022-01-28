import { useMutation, useQuery } from "@apollo/client";
import { Alert, Grow, Snackbar } from "@mui/material";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientAuth } from "../graphql/client";
import { Loader } from "../components/accessories/Loader";
import { LOGGED_USER, USER_LOGIN } from "../graphql/queries";

export const GrowTransition = memo((props) => {
  return <Grow {...props} />;
});

export const Verify = memo(() => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    login();
    setOpen(false);
    navigate("/movies/1");
  };
  const handleClose2 = () => {
    login();
    setOpen(false);
    navigate("/login");
  };
  const {
    loading: loadA,
    error: errorA,
    data: dataA,
  } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(localStorage.getItem("id")) },
    client: clientAuth,
  });
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
      }
    },
  });
  if (loadA) return <Loader state={true} />;
  if (errorA)
    return (
      <>
        <Loader state={false} />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose2}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ width: 400, height: 200 }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            You are not confirmed! Please Login!
          </Alert>
        </Snackbar>
      </>
    );
  if (dataA)
    return (
      <>
        <Loader state={false} />
        {dataA.publicUser.confirmedAt ? (
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            TransitionComponent={GrowTransition}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ width: 400, height: 200 }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              You are confirmed!
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose2}
            TransitionComponent={GrowTransition}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ width: 400, height: 200 }}
          >
            <Alert severity="warning" sx={{ width: "100%" }}>
              You are not confirmed yet. Please Check your Email!
            </Alert>
          </Snackbar>
        )}
      </>
    );
});
