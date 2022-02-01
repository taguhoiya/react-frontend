import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Badge, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "../../containers/Logout";
import { memo, useCallback, useContext, useRef, useState } from "react";
import { drawerWidth } from "./Drawer";
import SearchIcon from "@mui/icons-material/Search";
import MediaQuery from "react-responsive";
import { MovieCardContext } from "../providers/MovieCardProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/stock-photos/messageImage_1643716270607.png";

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
  const handleClickSearch = (e) => {
    e.preventDefault();
    setFormState(inputEl.current.value);
    locationPath.includes("movies") ? null : navigate("/movies/1");
  };
  return (
    <>
      <Toolbar
        sx={{
          pr: "24px",
          backgroundColor: "#e6edf5",
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

        <MediaQuery query="(min-width: 550px)">
          <Link to="/">
            <img src={logo} style={{ height: 30 }} />
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
          <IconButton color="inherit" open={openForm} onClick={handleClick}>
            <Badge color="secondary">
              <SearchIcon onClick={handleClickSearch} />
            </Badge>
          </IconButton>
          <form onSubmit={handleClickSearch}>
            <TextField
              label="Find Movie?"
              variant="outlined"
              size="small"
              inputRef={inputEl}
              type="text"
              sx={{ mr: 5, width: 250 }}
            />
          </form>
          <Logout />
        </MediaQuery>
        <MediaQuery query="(max-width: 550px)">
          <Link to="/">
            <img src={logo} style={{ height: 30 }} />
          </Link>
          <Typography
            component="h3"
            color="inherit"
            noWrap
            sx={{
              ml: 1,
              flexGrow: 1,
              fontFamily: `"Montserrat","游ゴシック",YuGothic,"ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN","メイリオ",Meiryo,sans-serif`,
            }}
          >
            moview
          </Typography>
          {openForm === false ? (
            <>
              <IconButton color="inherit" open={openForm} onClick={handleClick}>
                <Badge color="secondary">
                  <SearchIcon size="small" />
                </Badge>
              </IconButton>
              <Logout size="small" />
            </>
          ) : (
            <>
              <IconButton color="inherit" open={openForm} onClick={handleClick}>
                <Badge color="secondary">
                  <SearchIcon size="small" />
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
        </MediaQuery>
      </Toolbar>
    </>
  );
});
