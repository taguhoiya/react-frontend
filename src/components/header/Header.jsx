import { useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { AuthHeaderButton } from "../Button";
import { useQuery } from "@apollo/client";
import { MOVIE_CATEGORIES } from "../../graphql/queries.jsx";
import styled from "styled-components";
import { Loader } from "../Loader";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const STitle = styled.div`
  flex: 1;
`;

export const Header = () => {
  const { authState } = useContext(UserAuthContext);
  const profileUrl = `user/${authState.id}/profile`;
  const { loading, error, data } = useQuery(MOVIE_CATEGORIES);
  if (loading) return <Loader state />;
  if (error) return `Error ${error.message}`;
  return (
    <>
      <Loader state={false} />
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <STitle>
          <Link to="/">
            <IconButton>
              <MenuOpenIcon size="large" />
            </IconButton>
          </Link>
        </STitle>
        <STitle>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            // sx={{ flex: 1 }}
          >
            movie-sns
          </Typography>
        </STitle>
        <STitle style={{ textAlign: "right" }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          {authState.id === 0 ? (
            <>
              <AuthHeaderButton to="/register">Register</AuthHeaderButton>
              <AuthHeaderButton to="/login">Login</AuthHeaderButton>
            </>
          ) : (
            <>
              <AuthHeaderButton to={profileUrl}>Logout</AuthHeaderButton>
            </>
          )}
        </STitle>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {data.allCategories.map((movie) => (
          <Link
            color="inherit"
            noWrap
            key={movie.category}
            variant="subtitle2"
            href="/"
            sx={{ p: 1, flexShrink: 0 }}
          >
            {movie.category}
          </Link>
        ))}
      </Toolbar>
    </>
  );
};
