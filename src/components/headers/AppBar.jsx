import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Badge, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "../../containers/Logout";
import { memo, useCallback, useRef, useState } from "react";
import { drawerWidth } from "./Drawer";
import SearchIcon from "@mui/icons-material/Search";
import MediaQuery from "react-responsive";

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
  const { toggleDrawer, open, setFormState } = props;
  const [openForm, setOpenForm] = useState(false);
  const inputEl = useRef(null);
  const handleClick = useCallback(() => {
    setOpenForm((prevState) => !prevState);
  }, []);
  const handleClickSearch = (e) => {
    e.preventDefault();
    setFormState(inputEl.current.value);
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
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          moview
        </Typography>
        <MediaQuery query="(min-width: 550px)">
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
        </MediaQuery>
        <MediaQuery query="(max-width: 550px)">
          {openForm === false ? (
            <IconButton color="inherit" open={openForm} onClick={handleClick}>
              <Badge color="secondary">
                <SearchIcon />
              </Badge>
            </IconButton>
          ) : (
            <>
              <IconButton color="inherit" open={openForm} onClick={handleClick}>
                <Badge color="secondary">
                  <SearchIcon />
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
        <Logout />
      </Toolbar>
    </>
  );
});
