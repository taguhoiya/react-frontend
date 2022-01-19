import { createContext, useState } from "react";

export const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const { children } = props;

  const id = Number(localStorage.getItem("id")) || 0;
  const [authState, setAuthState] = useState({ id });
  return (
    <UserAuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </UserAuthContext.Provider>
  );
};
