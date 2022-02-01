import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import MarkIcon from "@mui/icons-material/RateReview";
import ClipIcon from "@mui/icons-material/Bookmark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { Link } from "react-router-dom";
import { List, ListItemButton } from "@mui/material";
import { memo } from "react";

export const MainListItems = memo(() => {
  return (
    <>
      <ListSubheader inset sx={{ backgroundColor: "#fff" }}>
        Contents
      </ListSubheader>
      <Link to="/movies/1" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <LocalMoviesIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Movies" sx={{ color: "black" }} />
        </ListItemButton>
      </Link>
      <Link to="/marks/1" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <MarkUnreadChatAltIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Marks" sx={{ color: "black" }} />
        </ListItemButton>
      </Link>
    </>
  );
});

export const SecondaryListItems = memo((props) => {
  const { to } = props;

  return (
    <List>
      <ListSubheader inset sx={{ backgroundColor: "#fff" }}>
        Info
      </ListSubheader>
      <Link to={to} style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ color: "black" }} />
        </ListItemButton>
      </Link>
      <Link to={to} state={{ num: 0 }} style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <MarkIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Marks" sx={{ color: "black" }} />
        </ListItemButton>
      </Link>
      <Link to={to} state={{ num: 1 }} style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <ClipIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Clips" sx={{ color: "black" }} />
        </ListItemButton>
      </Link>
      <Link to={to} state={{ num: 2 }} style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <FavoriteIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Favorites" sx={{ color: "black" }} />
        </ListItemButton>
      </Link>
    </List>
  );
});
