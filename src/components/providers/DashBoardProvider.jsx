import { useQuery } from "@apollo/client";
import { createContext, memo, useContext } from "react";
import { Loader } from "../Loader";
import { USER_INFO_TOP_PAGE } from "../../graphql/queries";
import { UserAuthContext } from "./UserAuthProvider";

export const DashBoardContext = createContext({});

export const DashBoardProvider = memo((props) => {
  const { children } = props;
  const { authState } = useContext(UserAuthContext);
  const {
    loading,
    data: dataU,
    error,
    refetch: refetchU,
  } = useQuery(USER_INFO_TOP_PAGE, {
    variables: { id: authState.id },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (dataU) {
    return (
      <DashBoardContext.Provider
        value={{
          refetchU,
          dataU,
          refetchDash: true,
        }}
      >
        {children}
      </DashBoardContext.Provider>
    );
  }
});
