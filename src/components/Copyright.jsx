import { Typography } from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";

export const Copyright = memo((props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={props.sx}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Moview
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
});
