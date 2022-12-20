import { ReactNode, createContext, memo, useState } from "react";

export const UserAuthContext = createContext({});

// type: UserAuthContextProps = {
//   user,
//   refetchLog,
//   LoggedFavos,
//   LoggedFavoMarkIds,
//   LoggedMarks,
//   LoggedClips,
//   LoggedClipMovieIds,
//   followerUser,
//   followingUser,
//   notifyLogged,
//   notifyLoggedP,
// };

export const UserAuthProvider = memo((props: { children: ReactNode }) => {
  const { children } = props;

  const id = Number(localStorage.getItem("id")) || 0;
  const [authState, setAuthState] = useState<{ id: number }>({ id });
  return (
    <UserAuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </UserAuthContext.Provider>
  );
});
