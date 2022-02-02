import { useQuery } from "@apollo/client";
import { createContext, memo } from "react";
import { useParams } from "react-router-dom";
import { USER_INFO } from "../../graphql/queries";
import { Loader } from "../accessories/Loader";
import defaultImage from "../../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";

export const UserInfoContext = createContext({});

export const UserInfoProvider = memo((props) => {
  const { children } = props;
  const params = useParams().userId;
  const { loading, error, data, refetch } = useQuery(USER_INFO, {
    variables: { id: parseInt(params) },
    fetchPolicy: "no-cache",
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const user = data.publicUser;
    const { favorites, marks, clips, nickname, selfIntro, followerUser, followingUser } = user;
    const markSub = [...marks];
    const marksModi = markSub.sort(function (a, b) {
      return a.movieId - b.movieId;
    });
    const favoSub = [...favorites];
    const favosModi = favoSub.sort(function (a, b) {
      return a.mark.movieId - b.mark.movieId;
    });
    const clipSub = [...clips];
    const clipsModi = clipSub.sort(function (a, b) {
      return a.movieId - b.movieId;
    });

    const uri = !user.path ? "" : `https://www.moview-ori.com${user.path}`;
    const src = !uri.includes("https") ? defaultImage : uri;
    const favoredMarks = favorites.map((favo) => favo.mark);
    const clippedMovieIds = clipsModi.map((clip) => clip.movieId);
    return (
      <UserInfoContext.Provider
        value={{
          user,
          favorites: favosModi,
          marks: marksModi,
          clips: clipsModi,
          nickname,
          src,
          params,
          refetch,
          favoredMarks,
          clippedMovieIds,
          followerUser,
          followingUser,
          selfIntro,
        }}
      >
        {children}
      </UserInfoContext.Provider>
    );
  }
});
