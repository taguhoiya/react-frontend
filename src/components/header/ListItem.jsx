import ListItem from "@mui/material/ListItem";
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
import { List } from "@mui/material";

export const MainListItems = (props) => {
  const { to } = props;
  return (
    <div>
      <ListSubheader inset sx={{ backgroundColor: "#e6edf5" }}>
        Contents
      </ListSubheader>
      <Link to="/movies/1" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <LocalMoviesIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Movies" sx={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to="/marks/1" state={{ num: 0 }} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <MarkUnreadChatAltIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Marks" sx={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to={to} state={{ num: 0 }} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <MarkIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Marks" sx={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to={to} state={{ num: 1 }} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <ClipIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Clips" sx={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to={to} state={{ num: 2 }} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Favorites" sx={{ color: "black" }} />
        </ListItem>
      </Link>
    </div>
  );
};

export const SecondaryListItems = (props) => {
  const { to } = props;

  return (
    <List>
      <ListSubheader inset sx={{ backgroundColor: "#e6edf5" }}>
        Info
      </ListSubheader>
      <Link to={to} state={{ num: 0 }} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ color: "black" }} />
        </ListItem>
      </Link>
    </List>
  );
};
