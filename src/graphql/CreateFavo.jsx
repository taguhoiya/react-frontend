import { useMutation } from "@apollo/client";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { CREATE_FAVO, DELETE_FAVO } from "./mutations";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const CreateFavoIcon = (props) => {
  const { favoSum, auth, markStrId, initialState } = props;
  const [count, countSetState] = useState(favoSum);
  const [favored, favoSetState] = useState(initialState);
  const userId = auth;
  const markId = parseInt(markStrId);
  const [createFavo] = useMutation(CREATE_FAVO, {
    variables: { userId, markId },
  });
  const clickFavo = count + 1;
  const unClickFavo = count - 1;
  const [deleteFavo] = useMutation(DELETE_FAVO, {
    variables: { markId, userId },
  });
  return (
    <>
      {favored ? (
        <>
          <IconButton
            sx={{ color: red[500] }}
            onClick={async () => {
              countSetState(unClickFavo);
              await deleteFavo();
              favoSetState(!favored);
              window.location.reload();
            }}
          >
            <FavoriteIcon />
          </IconButton>
          {count}
        </>
      ) : (
        <>
          <IconButton
            color="inherit"
            onClick={async () => {
              countSetState(clickFavo);
              await createFavo();
              favoSetState(!favored);
              window.location.reload();
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
          {count}
        </>
      )}
    </>
  );
};
