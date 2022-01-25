import { useQuery } from "@apollo/client";
import { createContext, memo } from "react";
import { useParams } from "react-router-dom";
import { USER_INFO } from "../../graphql/queries";
import { Loader } from "../Loader";
import defaultImage from "../../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";

export const UserInfoContext = createContext({});

export const UserInfoProvider = memo((props) => {
  const { children } = props;
  const params = useParams().userId;
  const { loading, error, data, refetch } = useQuery(USER_INFO, {
    variables: { id: parseInt(params) },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const user = data.publicUser;
    const { favorites, marks, clips, nickname } = user;
    const uri = !user.path ? "" : `https://www.moview-ori.com${user.path}`;
    const src = !uri.includes("https") ? defaultImage : uri;
    const favoredMarks = favorites.map((favo) => favo.mark);
    const clippedMovieIds = clips.map((clip) => parseInt(clip.movie.id));

    return (
      <UserInfoContext.Provider
        value={{
          user,
          favorites,
          marks,
          clips,
          nickname,
          src,
          params,
          refetch,
          favoredMarks,
          clippedMovieIds,
        }}
      >
        {children}
      </UserInfoContext.Provider>
    );
  }
});
