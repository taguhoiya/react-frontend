import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Navigate, useParams } from "react-router-dom";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Dashboard } from "./DashBoard";
import { LOGGED_USER } from "../graphql/queries";
import { clientAuth } from "../components/client.js";

const Demo = () => {
  const num = parseInt(useParams().num);
  const { authState } = useContext(UserAuthContext);
  const { error, data } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(authState.id) },
    client: clientAuth,
  });
  const { error: errorA, data: dataA } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(localStorage.getItem("id")) },
    client: clientAuth,
  });
  if (errorA) {
    return <Navigate to="/login" />;
  }
  if (dataA) {
    const valid = dataA.publicUser.confirmedAt;
    if (!valid) return <Navigate to="/login" />;
  }
  if (error) return `Error ${error.message}`;
  if (data) {
    return (
      <>
        <Dashboard num={num} />
      </>
    );
  }
};

export default Demo;
