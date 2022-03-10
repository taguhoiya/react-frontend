import Button from "@mui/material/Button";
import { memo, useCallback, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dropdown } from "../userProfile/Dropdowns";
import { useMutation } from "@apollo/client";
import {
  CREATE_FOLLOW,
  DELETE_FOLLOW,
  UPDATE_NOTI_CHECK,
  UPDATE_USER_IMAGE,
} from "../../graphql/mutations";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { clientAuth, clientUpload } from "../../graphql/client";
import { useContext } from "react";
import { purple } from "@mui/material/colors";
import { USER_REGISTER } from "../../graphql/queries";
import { GrowTransition } from "../../containers/Verify";
import MediaQuery from "react-responsive";
import { UserInfoContext } from "../providers/UserInfoProvider";
import { LoggedUserInfoContext } from "../providers/LoggedUserInfoProvider";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { DashBoardContext } from "../providers/DashBoardProvider";
import defaultImage from "../../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";
import Scrollbars from "react-custom-scrollbars-2";
import { Link } from "react-router-dom";

export const AuthButton = (props) => {
  const { nickname, email, password, passwordConfirmation } = props;
  const [loadingB, setLoadingB] = useState(false);
  const [open, setOpen] = useState(true);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoadingB(false);
    setOpen(false);
    localStorage.clear();
  };

  const [register, { error }] = useMutation(USER_REGISTER, {
    variables: { nickname, email, password, passwordConfirmation },
    client: clientAuth,
    update: (_proxy, response) => {
      const { id } = response.data.userRegister.user;
      if (!response.errors) {
        window.alert("Sent Email. Please Confirm it!");
        localStorage.setItem("id", id);
      }
    },
  });

  return (
    <>
      {!error ? null : (
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            Register Failed.
          </Alert>
        </Snackbar>
      )}
      <Button
        color="warning"
        type="submit"
        fullWidth
        variant="contained"
        disabled={loadingB}
        sx={{ mt: 3, mb: 2 }}
        onClick={(e) => {
          e.preventDefault();
          setLoadingB(true);
          register();
          if (error) setOpen(!open);
        }}
      >
        {props.children}
      </Button>
      {loadingB && (
        <CircularProgress
          size={20}
          sx={{
            color: purple[500],
            position: "absolute",
            left: "50%",
            mt: 4,
          }}
        />
      )}
    </>
  );
};

export const AuthHeaderButton = memo((props) => {
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        component={Link}
        to={props.to}
        sx={{ mx: "6px" }}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </>
  );
});

export const EditProfile = memo(() => {
  const { nickname, src, selfIntro, refetch } = useContext(UserInfoContext);
  const { authState } = useContext(UserAuthContext);
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(true);
  const [nameState, setNameState] = useState(nickname);
  const [selfIntState, setSelfIntState] = useState(selfIntro);
  const [imageState, setImageState] = useState(src);
  const [updateUserImage, { data, error }] = useMutation(UPDATE_USER_IMAGE, {
    variables: {
      image: imageState.postImage,
      id: authState.id,
      nickname: nameState,
      selfIntro: selfIntState,
    },
    client: clientUpload,
    update: (_proxy, response) => {
      if (!response.errors) {
        setTimeout(() => {}, 2000);
      }
    },
  });
  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClickClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleCloseS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenB(false);
    refetch();
  };
  const handleCloseB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenB(false);
  };
  const handleUpdateImage = useCallback(() => {
    setOpenB(true);
    updateUserImage();
    handleClickClose();
  }, []);
  return (
    <>
      {!error ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={2000}
          onClose={handleCloseB}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            There's something wrong! Update again correctly!
          </Alert>
        </Snackbar>
      )}
      {!data ? null : (
        <Snackbar
          open={openB}
          autoHideDuration={1000}
          onClose={handleCloseS}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Updated!
          </Alert>
        </Snackbar>
      )}
      <MediaQuery query="(min-width: 768px)">
        <Button
          variant="outlined"
          size="small"
          onClick={handleClickOpen}
          color="warning"
          sx={{ borderRadius: "4px" }}
        >
          Edit Profile
        </Button>
      </MediaQuery>
      <MediaQuery query="(max-width: 768px)">
        <Button
          variant="outlined"
          color="warning"
          onClick={handleClickOpen}
          size="small"
          sx={{ borderRadius: "4px", height: 27 }}
        >
          Edit Profile
        </Button>
      </MediaQuery>
      <Dialog
        open={open}
        onClose={handleClickClose}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center"></DialogTitle>
        <DialogContent align="center">
          <Avatar
            sx={{ width: 150, height: 150, marginBottom: 0.5 }}
            alt="icon"
            src={!imageState.image ? imageState : imageState.image}
          />
          <Dropdown setImageState={setImageState} imageState={imageState} />
          <TextField
            required
            margin="dense"
            id="name"
            label="Update Nickname?"
            type="name"
            fullWidth
            variant="standard"
            color="warning"
            defaultValue={nameState}
            onChange={(e) => setNameState(e.target.value)}
          />
          <TextField
            margin="dense"
            id="self-intro"
            label="Update Self-introduction?"
            type="text"
            fullWidth
            color="warning"
            variant="standard"
            defaultValue={selfIntState}
            onChange={(e) => setSelfIntState(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button onClick={handleUpdateImage} color="warning">
            UPDATE
          </Button>
          <Button onClick={handleClickClose} color="warning">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export const FollowButton = memo((props) => {
  const { authState } = useContext(UserAuthContext);
  const { refetch } = useContext(UserInfoContext);
  const { followingUser } = useContext(LoggedUserInfoContext);
  const { user } = props;
  const [follow] = useMutation(CREATE_FOLLOW, {
    variables: { followerId: authState.id, followedId: user.id },
  });
  const followingId = followingUser.map((user) => user.id);
  const [unfollow] = useMutation(DELETE_FOLLOW, {
    variables: { followerId: authState.id, followedId: user.id },
  });
  const [followState, setFollow] = useState(followingId.includes(user.id));
  const clickFollow = useCallback(() => {
    setFollow((prev) => !prev);
    follow();
    refetch();
  }, []);
  const clickUnfollow = useCallback(() => {
    setFollow((prev) => !prev);
    unfollow();
    refetch();
  }, []);
  return (
    <>
      {followState ? (
        <Button
          size="small"
          variant="outlined"
          sx={{ borderRadius: "4px" }}
          color="warning"
          onClick={clickUnfollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          size="small"
          variant="contained"
          sx={{ borderRadius: "4px" }}
          color="warning"
          onClick={clickFollow}
        >
          Follow
        </Button>
      )}
    </>
  );
});

export const NotificationButton = memo(() => {
  const { refetchDash, notifyDashP } = useContext(DashBoardContext);
  const { notifyLoggedP } = useContext(LoggedUserInfoContext);
  const { authState } = useContext(UserAuthContext);
  const passiveNotifications = refetchDash ? notifyDashP : notifyLoggedP;
  const noti = passiveNotifications.filter((noti) => !(parseInt(noti.visitor.id) === authState.id));
  const check = noti.map((noti) => noti.checked);
  const count = check.filter(function (x) {
    return x === false;
  }).length;
  const [countState, setCountState] = useState(count);
  const notiIds = noti.map((noti) => noti.id);
  const orUserPaths = noti.map((noti) => noti.visitor.path);
  const orNickNames = noti.map((noti) => noti.visitor.nickname);
  const orIds = noti.map((noti) => parseInt(noti.visitor.id));
  const commCont = noti.map((noti) => (!noti.comment ? null : noti.comment.content));
  const markId = noti.map((noti) => noti.markId);
  const action = noti.map((noti) => noti.action);
  const [noticheck] = useMutation(UPDATE_NOTI_CHECK, {
    variables: { ids: notiIds },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    !notiIds[0] ? null : noticheck();
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setCountState(0);
  }, []);
  const ary = noti.map((itemOfNoti, idx) => {
    return {
      edUserPath: orUserPaths[idx],
      orNickName: orNickNames[idx],
      orId: orIds[idx],
      comment: commCont[idx],
      action: action[idx],
      markId: markId[idx],
    };
  });
  return (
    <>
      <MediaQuery query="(min-width: 550px)">
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", mx: 2 }}>
          <Tooltip title="Notifications">
            <IconButton onClick={handleClick}>
              <Badge color="secondary" badgeContent={countState} max={100}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              height: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Scrollbars autoHeight autoHeightMin={180} autoHeightMax={360}>
            <List sx={{ bgcolor: "background.paper", width: 300 }}>
              {!ary[0] ? (
                <>
                  <Divider />
                  <ListItem
                    key={ary.id}
                    sx={{ fontStyle: "italic", fontWeight: "medium", width: 200, height: 240 }}
                    textAlign="center"
                  >
                    No notification!
                  </ListItem>
                  <Divider />
                </>
              ) : (
                ary.map((ary) => {
                  return (
                    <>
                      <Divider />
                      <ListItem key={ary.id} alignItems="flex-start">
                        <ListItemAvatar size="large">
                          <Link to={`/user/${ary.orId}/profile`}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={ary.orNickName}
                              src={!ary.orUserPath ? defaultImage : ary.orUserPath}
                            />
                          </Link>
                        </ListItemAvatar>
                        {ary.action === "favo" ? (
                          <ListItemText
                            primary={
                              <>
                                <Typography fontSize="0.8rem" color="text.primary">
                                  <Link
                                    to={`/user/${ary.orId}/profile`}
                                    style={{ color: "#FF6700" }}
                                  >
                                    {ary.orNickName}
                                  </Link>{" "}
                                  favored your{" "}
                                  <Link to={`/mark/${ary.markId}`} style={{ color: "#FF6700" }}>
                                    mark
                                  </Link>
                                  .
                                </Typography>
                              </>
                            }
                          />
                        ) : null}
                        {ary.action === "comment" ? (
                          <ListItemText
                            primary={
                              <>
                                <Typography fontSize="0.8rem" color="text.primary">
                                  <Link
                                    to={`/user/${ary.orId}/profile`}
                                    style={{ color: "#FF6700" }}
                                  >
                                    {ary.orNickName}
                                  </Link>{" "}
                                  commented your{" "}
                                  <Link to={`/mark/${ary.markId}`} style={{ color: "#FF6700" }}>
                                    mark
                                  </Link>
                                  .
                                </Typography>
                              </>
                            }
                            secondary={
                              <>
                                <Typography fontSize="0.7rem" color="#7a7979">
                                  {ary.comment}
                                </Typography>
                              </>
                            }
                          />
                        ) : null}
                        {ary.action === "follow" ? (
                          <ListItemText
                            primary={
                              <>
                                <Typography fontSize="0.8rem" color="text.primary">
                                  <Link
                                    to={`/user/${ary.orId}/profile`}
                                    style={{ color: "#FF6700" }}
                                  >
                                    {ary.orNickName}
                                  </Link>{" "}
                                  followed you.
                                </Typography>
                              </>
                            }
                          />
                        ) : null}
                      </ListItem>
                    </>
                  );
                })
              )}
            </List>
          </Scrollbars>
        </Menu>
      </MediaQuery>
      <MediaQuery query="(max-width: 550px)">
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", mx: 0 }}>
          <Tooltip title="Notifications">
            <IconButton onClick={handleClick}>
              <Badge color="secondary" badgeContent={countState} max={100}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{ p: 0 }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              height: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Scrollbars autoHeight autoHeightMin={180} autoHeightMax={360}>
            <List sx={{ bgcolor: "background.paper", width: 240 }}>
              {!ary[0] ? (
                <>
                  <Divider />
                  <ListItem
                    key={ary.id}
                    sx={{ fontStyle: "italic", fontWeight: "medium", width: 200, height: 240 }}
                    textAlign="center"
                  >
                    No notification!
                  </ListItem>
                  <Divider />
                </>
              ) : (
                ary.map((ary) => {
                  return (
                    <>
                      <Divider />
                      <ListItem key={ary.id} alignItems="flex-start">
                        <ListItemAvatar size="large">
                          <Link to={`/user/${ary.orId}/profile`}>
                            <Avatar
                              sx={{ width: 30, height: 30 }}
                              alt={ary.orNickName}
                              src={!ary.orUserPath ? defaultImage : ary.orUserPath}
                            />
                          </Link>
                        </ListItemAvatar>
                        {ary.action === "favo" ? (
                          <ListItemText
                            primary={
                              <>
                                <Typography fontSize="0.7rem" color="text.primary">
                                  <Link
                                    to={`/user/${ary.orId}/profile`}
                                    style={{ color: "#FF6700" }}
                                  >
                                    {ary.orNickName}
                                  </Link>{" "}
                                  favored your{" "}
                                  <Link to={`/mark/${ary.markId}`} style={{ color: "#FF6700" }}>
                                    mark
                                  </Link>
                                </Typography>
                              </>
                            }
                          />
                        ) : null}
                        {ary.action === "comment" ? (
                          <ListItemText
                            primary={
                              <>
                                <Typography fontSize="0.7rem" color="text.primary">
                                  <Link
                                    to={`/user/${ary.orId}/profile`}
                                    style={{ color: "#FF6700" }}
                                  >
                                    {ary.orNickName}
                                  </Link>{" "}
                                  commented your{" "}
                                  <Link to={`/mark/${ary.markId}`} style={{ color: "#FF6700" }}>
                                    mark
                                  </Link>
                                  .
                                </Typography>
                              </>
                            }
                            secondary={
                              <>
                                <Typography fontSize="0.6rem" color="#7a7979">
                                  {ary.comment}
                                </Typography>
                              </>
                            }
                          />
                        ) : null}
                        {ary.action === "follow" ? (
                          <ListItemText
                            primary={
                              <>
                                <Typography fontSize="0.7rem" color="text.primary">
                                  <Link
                                    to={`/user/${ary.orId}/profile`}
                                    style={{ color: "#FF6700" }}
                                  >
                                    {ary.orNickName}
                                  </Link>{" "}
                                  followed you.
                                </Typography>
                              </>
                            }
                          />
                        ) : null}
                      </ListItem>
                    </>
                  );
                })
              )}
            </List>
          </Scrollbars>
        </Menu>
      </MediaQuery>
    </>
  );
});
