import {
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
  TextField,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { MARK } from "./queries";
import { CommentDialog } from "../components/cards/CommentDialog";
import Scrollbars from "react-custom-scrollbars-2";
import defaultImage from "../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";
import { UserImageContext } from "../components/providers/UserImageProvider";
import { CREATE_COMMENT } from "./mutations";
import { CommentThreeVertIcon } from "../components/CommentThreeVertIcon";

export const CreateCommentIcon = (props) => {
  const { userId, id, markBool, ave, clipBool } = props;
  const [open, setOpen] = useState(false);
  const [commContent, setCommContent] = useState("");
  const { uri } = useContext(UserImageContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: { userId, markId: id, content: commContent },
  });

  const { loading, error, data } = useQuery(MARK, {
    variables: { id: parseInt(id) },
  });
  if (loading) return null;
  if (error) return `Error ${error.message}`;
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
        <IconButton onClick={handleClickOpen}>
          <CommentIcon sx={{ color: "black" }} />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <CommentDialog mark={mark} markBool={markBool} ave={ave} clipBool={clipBool} />
          <DialogContent>
            <Scrollbars autoHeight autoHeightMin={260} autoHeightMax={260}>
              <List sx={{ width: "100%", bgcolor: "background.paper", margin: "auto" }}>
                {!comments.length ? (
                  <DialogContentText
                    mt="15%"
                    sx={{ fontStyle: "italic", fontWeight: "medium" }}
                    variant="h4"
                    textAlign="center"
                  >
                    Post some comment!
                  </DialogContentText>
                ) : (
                  ary.map((ary, index) => {
                    return (
                      <>
                        <ListItem key={index} sx={{ pt: "-15px" }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ width: 45, height: 45 }}
                              alt={ary.user.nickname}
                              src={!ary.userPath ? defaultImage : ary.userPath}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
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
                                  component="span"
                                  variant="body1"
                                  color="text.primary"
                                >
                                  {ary.comment.content}
                                </Typography>
                              </>
                            }
                          />
                          <CommentThreeVertIcon commId={ary.comment.id} userId={ary.user.id} />
                        </ListItem>
                        <Divider />
                      </>
                    );
                  })
                )}
              </List>
            </Scrollbars>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Avatar
                sx={{ width: 33, height: 33, marginRight: 2, marginBottom: 0.5 }}
                alt="my image"
                src={uri}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
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
          <DialogActions>
            <Button
              onClick={() => {
                createComment();
                window.location.reload();
              }}
            >
              ADD
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        {/* <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" align="center">
          Are you sure?
        </DialogTitle>
        <DialogContent>
      <TextField hintText="Name Surname" fullWidth={true} />
    </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button onClick={createComment} color="primary">
            LOGOUT
          </Button>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog> */}
      </>
    );
  }
};
