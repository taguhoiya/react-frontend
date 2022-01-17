import { TextField } from "@mui/material";

export const NicknameInput = (props) => {
  return (
    <TextField
      margin={props.margin}
      required
      fullWidth
      id="nickname"
      label="nickname"
      name="nickname"
      autoComplete="nickname"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export const EmailInput = (props) => {
  return (
    <TextField
      margin={props.margin}
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export const PasswordInput = (props) => {
  return (
    <TextField
      margin={props.margin}
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="new-password"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export const PasswordConfInput = (props) => {
  return (
    <TextField
      margin={props.margin}
      required
      fullWidth
      name="passwordConfirmation"
      label="PasswordConfirmation"
      type="password"
      id="passwordConfirmation"
      autoComplete="new-password"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
