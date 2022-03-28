import { Badge, Box, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useMutation } from "@apollo/client";
import { CREATE_CLIP, DELETE_CLIP } from "./mutations";
import { memo, useCallback, useContext, useState } from "react";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { UserInfoContext } from "../components/providers/UserInfoProvider";
import { DashBoardContext } from "../components/providers/DashBoardProvider";

export const CreateClipIcon = memo((props) => {
  const { vert, size, initialState, clipSum, movieId, fontSize } = props;
  const { authState } = useContext(UserAuthContext);
  const { refetchU, refetchDash } = useContext(DashBoardContext);
  const { refetch } = useContext(UserInfoContext);
  const userId = authState.id;
  const [clipped, clipSetState] = useState(initialState);
  const [countClip, countSetClip] = useState(clipSum);
  const [createClip] = useMutation(CREATE_CLIP, {
    variables: { userId, movieId }, // movieId変更
  });
  const [deleteClip] = useMutation(DELETE_CLIP, {
    variables: { userId, movieId },
  });
  const clickClip = useCallback(() => {
    countSetClip((prev) => prev + 1);
    clipSetState((prev) => !prev);
    createClip();
    refetchDash ? refetchU() : refetch();
  }, [createClip, refetch, refetchDash, refetchU]);
  const unClickClip = useCallback(() => {
    countSetClip((prev) => prev - 1);
    clipSetState((prev) => !prev);
    deleteClip();
    refetchDash ? refetchU() : refetch();
  }, [deleteClip, refetch, refetchDash, refetchU]);

  return (
    <>
      {clipped ? (
        <>
          <IconButton size={size} color="warning" onClick={unClickClip}>
            <Badge color="secondary">
              <BookmarkIcon fontSize={fontSize ? fontSize : "medium"} />
            </Badge>
          </IconButton>
        </>
      ) : (
        <>
          <IconButton size={size} color="inherit" onClick={clickClip}>
            <Badge color="secondary">
              <BookmarkBorderIcon fontSize={fontSize ? fontSize : "medium"} />
            </Badge>
          </IconButton>
        </>
      )}
      {vert ? <Box>{countClip}</Box> : countClip}
    </>
  );
});
