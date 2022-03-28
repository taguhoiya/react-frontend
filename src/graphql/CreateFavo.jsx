import { useMutation } from "@apollo/client";
import { IconButton } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { CREATE_FAVO, DELETE_FAVO } from "./mutations";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserInfoContext } from "../components/providers/UserInfoProvider";
import { DashBoardContext } from "../components/providers/DashBoardProvider";
import { LoggedUserInfoContext } from "../components/providers/LoggedUserInfoProvider";

export const CreateFavoIcon = (props) => {
  const { favoSum, auth, markStrId, favoBool, fontSize } = props;
  const { refetch } = useContext(UserInfoContext);
  const { refetchU, refetchDash } = useContext(DashBoardContext);
  const { refetchLog } = useContext(LoggedUserInfoContext);
  const [count, countSetState] = useState(favoSum);
  const [favored, favoSetState] = useState(favoBool);
  const userId = auth;
  const markId = parseInt(markStrId);
  const [createFavo] = useMutation(CREATE_FAVO, {
    variables: { userId, markId },
  });
  const [deleteFavo] = useMutation(DELETE_FAVO, {
    variables: { markId, userId },
  });
  const clickFavo = useCallback(() => {
    countSetState((prev) => prev + 1);
    favoSetState((prev) => !prev);
    createFavo();
    refetchDash ? refetchU() : refetch();
    refetchLog();
  }, [createFavo, refetch, refetchDash, refetchLog, refetchU]);
  const unClickFavo = useCallback(() => {
    countSetState((prev) => prev - 1);
    favoSetState((prev) => !prev);
    deleteFavo();
    refetchDash ? refetchU() : refetch();
    refetchLog();
  }, [deleteFavo, refetch, refetchDash, refetchLog, refetchU]);

  return (
    <>
      {favored ? (
        <>
          <IconButton sx={{ color: red[500] }} onClick={unClickFavo}>
            <FavoriteIcon fontSize={fontSize ? fontSize : "medium"} />
          </IconButton>
          {count}
        </>
      ) : (
        <>
          <IconButton color="inherit" onClick={clickFavo}>
            <FavoriteBorderIcon fontSize={fontSize ? fontSize : "medium"} />
          </IconButton>
          {count}
        </>
      )}
    </>
  );
};
