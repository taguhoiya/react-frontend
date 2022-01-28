import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { memo, useCallback, useContext, useState } from "react";
import { DELETE_MARK } from "../../graphql/mutations";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { StyledMenu } from "../accessories/StyledMenu";
import { GrowTransition } from "../../containers/Verify";
import { UserInfoContext } from "../providers/UserInfoProvider";
import { DashBoardContext } from "../providers/DashBoardProvider";

export const MarkThreeVertIcon = memo((props) => {
  const { markId, userId } = props;
  const { refetch } = useContext(UserInfoContext);
  const { refetchU, refetchDash } = useContext(DashBoardContext);
  const { authState } = useContext(UserAuthContext);
  const [deleteMark, { data }] = useMutation(DELETE_MARK, {
    variables: { id: parseInt(markId) },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openB, setOpenB] = useState(true);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleCloseSnack = useCallback(() => {
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
  const handleDelete = useCallback(() => {
    setOpenB(true);
    deleteMark();
    refetchDash ? refetchU() : refetch();
  }, []);
  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleCloseSnack();
  };
  if (parseInt(userId) === authState.id)
    return (
      <>
        {!data ? null : (
          <Snackbar
            open={openB}
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
          <MenuItem onClick={handleClick2}>
            <DeleteIcon fontSize="small" />
            Delete
          </MenuItem>
          <MenuItem onClick={handleClose}>
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
              <Button onClick={handleDelete} color="primary">
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
