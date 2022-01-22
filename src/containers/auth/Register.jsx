import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { memo, useState } from "react";
import {
  NicknameInput,
  EmailInput,
  PasswordInput,
  PasswordConfInput,
} from "../../components/Form.jsx";
import { Copyright } from "../../components/Copyright";
import { AuthButton } from "../../components/Button";

const theme = createTheme();

export const Register = memo(() => {
  const [formState, setFormState] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { nickname, email, password, passwordConfirmation } = formState;

  return (
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
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <NicknameInput
                  value={nickname}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nickname: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <EmailInput
                  value={email}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      email: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  value={password}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      password: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordConfInput
                  value={passwordConfirmation}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      passwordConfirmation: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <AuthButton
              nickname={nickname}
              email={email}
              password={password}
              passwordConfirmation={passwordConfirmation}
            >
              Register
            </AuthButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
});
