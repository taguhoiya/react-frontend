import { Badge, Box, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useMutation } from "@apollo/client";
import { CREATE_CLIP, DELETE_CLIP } from "./mutations";
import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../components/providers/UserAuthProvider";

export const CreateClipIcon = memo((props) => {
  const { vert, size, initialState, clipSum, movieId } = props;
  const { authState } = useContext(UserAuthContext);
  const userId = authState.id;
  const [clipped, clipSetState] = useState(initialState);
  const [countClip, countSetClip] = useState(clipSum);
  const clickClip = useCallback(() => {
    countSetClip((prev) => prev + 1);
    clipSetState((prev) => !prev);
  }, []);
  const unClickClip = useCallback(() => {
    countSetClip((prev) => prev - 1);
    clipSetState((prev) => !prev);
  }, []);
  const [createClip] = useMutation(CREATE_CLIP, {
    variables: { userId, movieId }, // movieId変更
  });
  const [deleteClip] = useMutation(DELETE_CLIP, {
    variables: { userId, movieId },
  });
  return (
    <>
      {clipped ? (
        <>
          <IconButton
            size={size}
            color="warning"
            onClick={() => {
              unClickClip();
              deleteClip();
              window.location.reload();
            }}
          >
            <Badge color="secondary">
              <BookmarkIcon fontSize="small" />
            </Badge>
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            size={size}
            color="inherit"
            onClick={() => {
              clickClip();
              createClip();
            }}
          >
            <Badge color="secondary">
              <BookmarkBorderIcon fontSize="small" />
            </Badge>
          </IconButton>
        </>
      )}
      {vert ? <Box>{countClip}</Box> : countClip}
    </>
  );
});
