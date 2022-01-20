import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Navigate, useParams } from "react-router-dom";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Loader } from "../components/Loader";
import { Dashboard } from "./DashBoard";
import { LOGGED_USER } from "../graphql/queries";
import { clientAuth } from "../components/client.js";

const Demo = () => {
  const num = parseInt(useParams().num);
  const { authState } = useContext(UserAuthContext);
  const { loading, error, data } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(authState.id) },
    client: clientAuth,
  });
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
    return <Navigate to="/login" />;
  }
  if (dataA) {
    const valid = dataA.publicUser.confirmedAt;
    if (!valid) return <Navigate to="/login" />;
  }
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    return (
      <>
        <Loader state={false} />
        <Dashboard num={num} />
      </>
    );
  }
};

export default Demo;
