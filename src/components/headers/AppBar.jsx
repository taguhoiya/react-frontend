import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Badge, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "../../containers/Logout";
import { memo, useCallback, useContext, useRef, useState } from "react";
import { drawerWidth } from "./Drawer";
import SearchIcon from "@mui/icons-material/Search";
import MediaQuery from "react-responsive";
import { MovieCardContext } from "../providers/MovieCardProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/HatchfulExport-All/logo_transparent copy 2.png";
import { NotificationButton } from "../accessories/Button";

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const ToolBarModi = memo((props) => {
  const { toggleDrawer, open } = props;
  const [openForm, setOpenForm] = useState(false);
  const inputEl = useRef(null);
  const { setFormState } = useContext(MovieCardContext);
  const locationPath = useLocation().pathname;
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    setOpenForm((prevState) => !prevState);
  }, []);
  const condition = locationPath.includes("movies") ? null : navigate("/movies/1");
  const handleClickSearch = (e) => {
    e.preventDefault();
    setFormState(inputEl.current.value);
    condition();
  };
  return (
    <>
      <MediaQuery query="(min-width: 550px)">
        <Toolbar
          sx={{
            pr: "24px",
            backgroundColor: "#fff",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logo} style={{ height: 60 }} alt={logo}/>
          </Link>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            sx={{
              ml: 2,
              flexGrow: 1,
              fontFamily: `"Montserrat","游ゴシック",YuGothic,"ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN","メイリオ",Meiryo,sans-serif`,
            }}
          >
            moview
          </Typography>
          {openForm === false ? (
            <>
              <Tooltip title="Find Movie">
                <IconButton color="inherit" open={openForm} onClick={handleClick}>
                  <Badge color="secondary">
                    <SearchIcon onClick={handleClickSearch} color="black" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <NotificationButton />
              <Logout />
            </>
          ) : (
            <>
              <Tooltip title="Close Search Form">
                <IconButton color="inherit" open={openForm} onClick={handleClick}>
                  <Badge color="secondary">
                    <SearchIcon onClick={handleClickSearch} color="black" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <form onSubmit={handleClickSearch}>
                <TextField
                  color="warning"
                  label="Find Movie?"
                  variant="outlined"
                  size="small"
                  inputRef={inputEl}
                  type="text"
                  sx={{ mx: 1, width: 250 }}
                />
              </form>
              <NotificationButton />
              <Logout />
            </>
          )}
        </Toolbar>
      </MediaQuery>
      <MediaQuery query="(max-width: 550px)">
        <Toolbar
          sx={{
            pr: "8px",
            backgroundColor: "#fff",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            size="small"
            sx={{
              marginRight: "10px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logo} alt={logo} style={{ height: 40 }} />
          </Link>
          <Typography
            component="h3"
            color="inherit"
            noWrap
            sx={{
              ml: 0.3,
              flexGrow: 1,
              fontFamily: `"Montserrat","游ゴシック",YuGothic,"ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN","メイリオ",Meiryo,sans-serif`,
            }}
          >
            moview
          </Typography>
          {openForm === false ? (
            <>
              <IconButton color="inherit" open={openForm} onClick={handleClick} size="small">
                <Badge color="secondary">
                  <SearchIcon size="small" color="black" />
                </Badge>
              </IconButton>
              <NotificationButton />
              <Logout size="small" />
            </>
          ) : (
            <>
              <IconButton color="inherit" open={openForm} onClick={handleClick} size="small">
                <Badge color="secondary">
                  <SearchIcon size="small" color="black" />
                </Badge>
              </IconButton>
              <form onSubmit={handleClickSearch}>
                <TextField
                  id="outlined-basic"
                  label="Find Movie?"
                  variant="outlined"
                  size="small"
                  type="text"
                  inputRef={inputEl}
                />
              </form>
            </>
          )}
        </Toolbar>
      </MediaQuery>
    </>
  );
});
