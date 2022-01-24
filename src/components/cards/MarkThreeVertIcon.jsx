import { Alert, Button, Dialog, DialogActions, DialogTitle, IconButton, Snackbar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { memo, useCallback, useContext, useState } from "react";
import { DELETE_MARK } from "../../graphql/mutations";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { StyledMenu } from "../StyledMenu";
import { GrowTransition } from "../../containers/Verify";

export const MarkThreeVertIcon = memo((props) => {
  const { markId, userId } = props;
  const [deleteMark, { data }] = useMutation(DELETE_MARK, {
    variables: { id: parseInt(markId) },
  });
  const { authState } = useContext(UserAuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [, setOpenB] = useState(true);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClickDelete = useCallback(() => {
    setOpenB((prevState) => !prevState);
  }, []);
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
  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleClickDelete();
    window.location.reload();
  };
  if (parseInt(userId) === authState.id)
    return (
      <>
            {!data ? null : (
        <Snackbar
          open={handleCloseBar}
          autoHideDuration={700}
          onClose={handleCloseBar}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Deleted successfully!
          </Alert>
        </Snackbar>
      )}
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
                onClick={() => deleteMark()}
                color="primary"
              >
                DELETE
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
});
