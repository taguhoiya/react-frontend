import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UPDATE_USER_IMAGE } from "../../graphql/mutations";
import { LOGGED_USER } from "../../graphql/queries";
import { client, clientAuth } from "../client";
import { Loader } from "../Loader";
import { UserImageContext } from "../providers/UserImageProvider";

export const UpdateImage = (props) => {
  const { setImageState } = useContext(UserImageContext);
  const { image } = props.postFileData;
  const [updateUserImage] = useMutation(UPDATE_USER_IMAGE, {
    variables: { image },
    client: client,
    update: (_proxy, response) => {
      const { image } = response.data.updateUserImage.user;
      if (!response.errors) {
        console.log("OK");
        return image;
      } else {
        alert("Upload failed");
        setImageState({ image: {} });
      }
    },
  });

  const id = Number(localStorage.getItem("id"));
  const { loading, data } = useQuery(LOGGED_USER, {
    variables: { id },
    client: clientAuth,
    fetchPolicy: id ? "network-only" : "cache-only",
  });
  if (loading) {
    return <Loader state={true} />;
  } else if (data) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Loader state={false} />
    </>
  );
};
