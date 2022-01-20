import { useQuery } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";
import { LOGGED_USER } from "../../../graphql/queries";
import { clientAuth } from "../../client";
import { Loader } from "../../Loader";

export const UnauthenticatedRoute = () => {
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
    console.log("Not found");
    return <Outlet />;
  }
  if (dataA) {
    const valid = dataA.publicUser.confirmedAt;
    console.log("Confirmed");
    if (!valid) return <Navigate to="/movies/1" />;
    else return <Outlet />;
  }
  return <Loader state={false} />;
};
