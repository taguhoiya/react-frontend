import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Navigate, useParams } from "react-router-dom";
import { UserAuthContext } from "../components/providers/UserAuthProvider";
import { Loader } from "../components/Loader";
import { Dashboard } from "./DashBoard";
import { GET_USERS } from "../graphql/queries";

const Demo = () => {
  const num = parseInt(useParams().num);
  const { authState } = useContext(UserAuthContext);
  const { loading, error, data } = useQuery(GET_USERS);
  if (authState.id === 0) {
    return <Navigate to="/login" />;
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
