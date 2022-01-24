import { useMutation } from "@apollo/client";
import { IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { CREATE_FAVO, DELETE_FAVO } from "./mutations";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const CreateFavoIcon = (props) => {
  const { favoSum, auth, markStrId, favoBool } = props;
  const [count, countSetState] = useState(favoSum);
  const [favored, favoSetState] = useState(favoBool);
  const userId = auth;
  const markId = parseInt(markStrId);
  const [createFavo] = useMutation(CREATE_FAVO, {
    variables: { userId, markId },
    fetchPolicy: "network-only",
  });
  const clickFavo = useCallback(() => {
    countSetState((prev) => prev + 1);
  }, []);
  const unClickFavo = useCallback(() => {
    countSetState((prev) => prev - 1);
  }, []);
  const [deleteFavo] = useMutation(DELETE_FAVO, {
    variables: { markId, userId },
    fetchPolicy: "network-only",
  });
  return (
    <>
      {favored ? (
        <>
          <IconButton
            sx={{ color: red[500] }}
            onClick={() => {
              countSetState(unClickFavo);
              deleteFavo();
              window.location.reload();
              favoSetState(!favored);
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
          {count}
        </>
      ) : (
        <>
          <IconButton
            color="inherit"
            onClick={() => {
              countSetState(clickFavo);
              createFavo();
              favoSetState(!favored);
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          {count}
        </>
      )}
    </>
  );
};
