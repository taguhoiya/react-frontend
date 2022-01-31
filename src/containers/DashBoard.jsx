import { memo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { EachMovieCard } from "../components/cards/EachMovieCard";
import { useLocation, useParams } from "react-router-dom";
import { EachMarkCard } from "../components/cards/EachMarkCard";
import { Loader } from "../components/accessories/Loader";

export const mdTheme = createTheme();

export const Dashboard = memo(() => {
  const num = parseInt(useParams().num);
  const location = useLocation().pathname;
  return (
    <>
      <Loader state={false} />
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          {location === "/" && <EachMovieCard num={num} />}
          {location.includes("movie") && <EachMovieCard num={num} />}
          {location.includes("marks") && <EachMarkCard num={num} />}
        </Box>
      </ThemeProvider>
    </>
  );
});
