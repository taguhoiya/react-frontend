import { useQuery } from "@apollo/client";
import { createContext, memo, useContext } from "react";
import { Loader } from "../accessories/Loader";
import { UserAuthContext } from "./UserAuthProvider";
import { USER_INFO_TOP_PAGE } from "../../graphql/queries";

export const LoggedUserInfoContext = createContext({});

export const LoggedUserInfoProvider = memo((props) => {
  const { children } = props;
  const { authState } = useContext(UserAuthContext);
  const loggedUserId = authState.id;
  const {
    loading,
    error,
    data: authData,
    refetch: refetchLog,
  } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: loggedUserId },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (authData) {
    const user = authData.publicUser;
    const {
      favorites: LoggedFavos,
      marks: LoggedMarks,
      clips: LoggedClips,
      followerUser,
      followingUser,
    } = user;
    const LoggedFavoMarkIds = LoggedFavos.map((favo) => favo.mark.id);
    const LoggedClipMovieIds = LoggedClips.map((clip) => clip.movieId);
    return (
      <LoggedUserInfoContext.Provider
        value={{
          user,
          refetchLog,
          LoggedFavos,
          LoggedFavoMarkIds,
          LoggedMarks,
          LoggedClips,
          LoggedClipMovieIds,
          followerUser,
          followingUser,
        }}
      >
        {children}
      </LoggedUserInfoContext.Provider>
    );
  }
});
