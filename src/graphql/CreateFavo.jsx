import { useMutation } from "@apollo/client";
import { IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { CREATE_FAVO, DELETE_FAVO } from "./mutations";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const CreateFavoIcon = (props) => {
  const { favoSum, auth, markStrId, favoBool, fontSize } = props;
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
    favoSetState((prev) => !prev);
  }, []);
  const unClickFavo = useCallback(() => {
    countSetState((prev) => prev - 1);
    favoSetState((prev) => !prev);
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
              unClickFavo();
              deleteFavo();
              window.location.reload();
            }}
          >
            <FavoriteIcon fontSize={fontSize ? fontSize : "medium"} />
          </IconButton>
          {count}
        </>
      ) : (
        <>
          <IconButton
            color="inherit"
            onClick={() => {
              clickFavo();
              createFavo();
              window.location.reload();
            }}
          >
            <FavoriteBorderIcon fontSize={fontSize ? fontSize : "medium"} />
          </IconButton>
          {count}
        </>
      )}
    </>
  );
};
