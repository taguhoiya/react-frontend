import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOGGED_USER } from "../../../graphql/queries";
import { clientAuth } from "../../client";
import { Loader } from "../../Loader";
import { memo } from "react";

export const AuthenticatedRoute = memo(() => {
  const location = useLocation();
  const {
    loading,
    error: errorA,
    data: dataA,
  } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(localStorage.getItem("id")) },
    client: clientAuth,
  });
  if (loading) return <Loader state={true} />;
  if (errorA) {
    return (
      <>
        <Loader state={false} />
        <Navigate
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      </>
    );
  }
  if (dataA) {
    const valid = dataA.publicUser.confirmedAt;
    if (!valid) {
      return (
        <>
          <Loader state={false} />
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        </>
      );
    } else return <Outlet />;
  }
});
