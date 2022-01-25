import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { memo, useCallback, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { MARK } from "./queries";
import { CommentDialog } from "../components/dialogs/CommentDialog";
import Scrollbars from "react-custom-scrollbars-2";
import defaultImage from "../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";
import { UserImageContext } from "../components/providers/UserImageProvider";
import { CREATE_COMMENT } from "./mutations";
import { CommentThreeVertIcon } from "../components/CommentThreeVertIcon";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Loader } from "../components/Loader";
import { GrowTransition } from "../containers/Verify";

export const CreateCommentIcon = memo((props) => {
  const { info, markId } = props;
  const [open, setOpen] = useState(false);
  const { authState } = useContext(UserAuthContext);
  const userId = authState.id;
  const [commContent, setCommContent] = useState("");
  const { uri } = useContext(UserImageContext);
  const [openB, setOpenB] = useState(true);

  const handleClickOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClose = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const [createComment, { error, data: dataC }] = useMutation(CREATE_COMMENT, {
    variables: { userId, markId, content: commContent },
  });
  const {
    loading,
    data,
    refetch: refetchC,
  } = useQuery(MARK, {
    variables: { id: parseInt(markId) },
    fetchPolicy: "cache-and-network",
  });
  const handleComm = useCallback(() => {
    setOpenB(true);
    createComment();
  }, []);
  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenB(false);
    refetchC();
  };
  if (loading) return <Loader state={true} />;
  if (data) {
    const mark = data.mark;
    const comments = mark.comments;
    const users = comments.map((comm) => comm.user);
    const usersPath = users.map((user) =>
      !user.path ? "" : `https://www.moview-ori.com${user.path}/`
    );
    const ary = comments.map((itemOfComment, idx) => {
      return {
        comment: comments[idx],
        user: users[idx],
        userPath: usersPath[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        {!error ? null : (
          <Snackbar
            open={openB}
            autoHideDuration={1500}
            onClose={handleCloseBar}
            TransitionComponent={GrowTransition}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="warning" sx={{ width: "100%" }}>
              Type a comment!
            </Alert>
          </Snackbar>
        )}
        {!dataC ? null : (
          <Snackbar
            open={openB}
            autoHideDuration={800}
            onClose={handleCloseBar}
            TransitionComponent={GrowTransition}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Commented
            </Alert>
          </Snackbar>
        )}
        <IconButton onClick={handleClickOpen}>
          <CommentIcon sx={{ color: "black" }} fontSize="small" />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <CommentDialog
            mark={mark}
            favoBool={info.favoBool}
            ave={info.ave}
            clipBool={info.clipBool}
            info={info}
          />
          <DialogContent>
            <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={200}>
              <List sx={{ width: "100%", margin: "auto" }}>
                {!comments.length ? (
                  <DialogContentText
                    mt="10%"
                    sx={{ fontStyle: "italic", fontWeight: "medium" }}
                    variant="h6"
                    textAlign="center"
                  >
                    Post first comment!
                  </DialogContentText>
                ) : (
                  ary.map((ary) => {
                    return (
                      <>
                        <Divider />
                        <ListItem key={ary.comment.id}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={ary.user.nickname}
                              src={!ary.userPath ? defaultImage : ary.userPath}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  fontSize="0.6rem"
                                  color="text.primary"
                                >
                                  {ary.user.nickname}
                                </Typography>
                              </>
                            }
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  fontSize="0.8rem"
                                  color="text.primary"
                                >
                                  {ary.comment.content}
                                </Typography>
                              </>
                            }
                          />
                          <CommentThreeVertIcon commId={ary.comment.id} userId={ary.user.id} />
                        </ListItem>
                      </>
                    );
                  })
                )}
              </List>
            </Scrollbars>
            <Divider color="" />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Avatar
                sx={{ width: 25, height: 25, marginRight: 2, marginBottom: 0.5 }}
                alt="my image"
                src={uri}
              />
              <TextField
                type="text"
                fullWidth
                variant="standard"
                label="Comment"
                value={commContent}
                onChange={(e) => {
                  setCommContent(e.target.value);
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions disableSpacing={true}>
            <Button onClick={handleComm}>ADD</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
});
