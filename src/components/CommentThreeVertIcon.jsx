import { Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledMenu } from "./StyledMenu";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { DELETE_COMMENT } from "../graphql/mutations";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserAuthContext } from "./providers/UserAuthProvider";
import EditIcon from "@mui/icons-material/Edit";

export const CommentThreeVertIcon = (props) => {
  const { commId, userId } = props;
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { id: commId },
    fetchPolicy: "network-only",
  });
  const { authState } = useContext(UserAuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  if (parseInt(userId) === authState.id)
    return (
      <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon fontSize="small" />
            Edit
          </MenuItem>
          <MenuItem onClick={handleClick2} disableRipple>
            <DeleteIcon fontSize="small" />
            Delete
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <CancelIcon fontSize="small" />
            Cancel
          </MenuItem>
          <Dialog
            open={open2}
            onClose={handleClose2}
            fullWidth={true}
            maxWidth="xs"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" align="center">
              Are you sure?
            </DialogTitle>
            <DialogActions sx={{ margin: "auto" }}>
              <Button
                onClick={() => {
                  deleteComment();
                  window.location.reload();
                }}
                color="primary"
              >
                DELETE Comment
              </Button>
              <Button onClick={handleClose2} color="primary">
                CANCEL
              </Button>
            </DialogActions>
          </Dialog>
        </StyledMenu>
      </>
    );
  if (parseInt(userId) !== authState.id) return null;
};
