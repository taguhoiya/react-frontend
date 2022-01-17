/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { USER_LOGIN, LOGGED_USER } from "../../graphql/queries.jsx";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { clientAuth } from "../../components/client";
import { EmailInput, PasswordInput } from "../../components/Form";
import { Copyright } from "../../components/Copyright";
import { UserAuthContext } from "../../components/providers/UserAuthProvider";
import { AuthButton } from "../../components/Button";
import { Loader } from "../../components/Loader";

const theme = createTheme();

export const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setAuthState } = useContext(UserAuthContext);
  const { email, password } = formState;
  const [login] = useMutation(USER_LOGIN, {
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
        navigate("/");
      } else {
        alert("ログイン情報が不正です。");
        setFormState({ email: "", password: "" });
        localStorage.clear();
      }
    },
  });
  const id = Number(localStorage.getItem("id"));
  const { loading, data } = useQuery(LOGGED_USER, {
    variables: { id },
    client: clientAuth,
    fetchPolicy: id ? "network-only" : "cache-only",
  });
  if (loading) {
    return <Loader state={true} />;
  } else if (data) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Loader state={false} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
              noValidate
              sx={{ mt: 1 }}
            >
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
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <AuthButton>Login</AuthButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
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
};
