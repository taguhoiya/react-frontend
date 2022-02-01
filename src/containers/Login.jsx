import { memo, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { USER_LOGIN } from "../graphql/queries.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { clientAuth } from "../graphql/client";
import { EmailInput, PasswordInput } from "../components/accessories/Form";
import { Copyright } from "../components/accessories/Copyright";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { GrowTransition } from "./Verify.jsx";
import { purple } from "@mui/material/colors";

const theme = createTheme();

export const Login = memo(() => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [loadingB, setLoadingB] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { setAuthState } = useContext(UserAuthContext);
  const { email, password } = formState;

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoadingB(false);
    setOpen(false);
    navigate("/movies/1");
    window.location.reload();
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoadingB(false);
    setOpen(false);
    localStorage.clear();
  };

  const [login, { error, data }] = useMutation(USER_LOGIN, {
    variables: { email, password },
    client: clientAuth,
    update: (_proxy, response) => {
      const { accessToken, client, uid } = response.data.userLogin.credentials;
      const { id } = response.data.userLogin.user;
      if (!response.errors) {
        localStorage.setItem("id", id);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        setAuthState({ id });
      }
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          {!error ? null : (
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose2}
              TransitionComponent={GrowTransition}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="warning" sx={{ width: "100%" }}>
                Login Failed.
              </Alert>
            </Snackbar>
          )}
          {!data ? null : (
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose1}
              TransitionComponent={GrowTransition}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Succcess!
              </Alert>
            </Snackbar>
          )}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <EmailInput
                margin="normal"
                value={email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
              />
              <PasswordInput
                margin="normal"
                value={password}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    password: e.target.value,
                  })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="warning" />}
                label="Remember me"
              />
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
                  login();
                  if (error) setOpen(!open);
                }}
              >
                LOGIN
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
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
});
