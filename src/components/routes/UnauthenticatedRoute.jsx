import { useQuery } from "@apollo/client";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOGGED_USER } from "../../graphql/queries";
import { clientAuth } from "../../graphql/client";
import { Loader } from "../accessories/Loader";

export const UnauthenticatedRoute = memo(() => {
  const {
    loading: loadA,
    error: errorA,
    data: dataA,
  } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(localStorage.getItem("id")) },
    client: clientAuth,
  });
  if (loadA) {
    return <Loader state={true} />;
  }
  if (errorA) {
    return (
      <>
        <Loader state={false} />
        <Outlet />
      </>
    );
  }
  if (dataA) {
    const valid = dataA.publicUser.confirmedAt;
    if (valid)
      return (
        <>
          <Loader state={false} />
          <Navigate to="/movies/1" />
        </>
      );
    else
      return (
        <>
          <Loader state={false} />
          <Outlet />
        </>
      );
  }
});
