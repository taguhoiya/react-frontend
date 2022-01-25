import { createContext, memo, useState } from "react";

export const UserAuthContext = createContext({});

export const UserAuthProvider = memo((props) => {
  const { children } = props;

  const id = Number(localStorage.getItem("id")) || 0;
  const [authState, setAuthState] = useState({ id });
  return (
    <UserAuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </UserAuthContext.Provider>
  );
});
