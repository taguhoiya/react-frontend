import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={props.sx}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Moview
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
