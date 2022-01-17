import { Button, Menu, MenuItem } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

import { resizeFile } from "../../Helper";

export const Dropdown = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const { imageState, setImageState } = props;
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const { imageState, setImageState } = useContext(UserImageContext);
  const handleClose1 = () => {
    setAnchorEl(false);
  };
  const changeUploadFile = async (event) => {
    const { name, files } = event.target;
    const image = await resizeFile(files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageState({
        ...imageState,
        [name]: e.target.result,
        postImage: image,
      });
    };
    reader.readAsDataURL(files[0]);
    event.target.value = "";
    handleClose1();
  };
  return (
    <div style={{ marginTop: "-25px" }}>
      <Button
        aria-controls="simple-menu"
        variant="contained"
        color="primary"
        size="small"
        aria-haspopup="true"
        onClick={handleClick1}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        <UploadMenuItem name="image" onChange={changeUploadFile}>
          Upload
        </UploadMenuItem>

        <MenuItem onClick={handleClose1}>Cancel</MenuItem>
      </Menu>
    </div>
  );
};

const useUploadButtonStyles = makeStyles((theme) =>
  createStyles({
    input: {
      display: "none",
    },
  })
);
const UploadMenuItem = (props) => {
  const { handleClose1 } = props;
  const classes = useUploadButtonStyles();
  return (
    <label htmlFor={`upload-button-${props.name}`}>
      <input
        accept="image/*"
        className={classes.input}
        id={`upload-button-${props.name}`}
        name={props.name}
        i
        type="file"
        onChange={props.onChange}
      />
      <MenuItem onClick={handleClose1}>{props.children}</MenuItem>
    </label>
  );
};
