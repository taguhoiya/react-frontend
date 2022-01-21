import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOGGED_USER } from "../../../graphql/queries";
import { clientAuth } from "../../client";
import { Loader } from "../../Loader";
import { memo } from "react";

export const AuthenticatedRoute = memo(() => {
  const location = useLocation();
  const { error: errorA, data: dataA } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(localStorage.getItem("id")) },
    client: clientAuth,
  });
  if (errorA) {
    console.log("Not found");
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }
  if (dataA) {
    console.log("Not confirmed");
    const valid = dataA.publicUser.confirmedAt;
    if (!valid) {
      console.log("Not confirmed");
      return (
        <Navigate
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    } else return <Outlet />;
  }
  return <Loader state={false} />;
});
