import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Dashboard } from "./DashBoard";
import { LOGGED_USER } from "../graphql/queries";
import { clientAuth } from "../components/client.js";

const Demo = () => {
  const num = parseInt(useParams().num);
  const { authState } = useContext(UserAuthContext);
  const { error, loading, data } = useQuery(LOGGED_USER, {
    variables: { id: parseInt(authState.id) },
    client: clientAuth,
  });
  if (loading) return null;
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
