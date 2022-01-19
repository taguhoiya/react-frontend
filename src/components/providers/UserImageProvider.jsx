import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { client } from "../client";
import { Loader } from "../Loader";
import { useQuery } from "@apollo/client";
import { USER_IMAGE } from "../../graphql/queries";
import { UserAuthContext } from "./UserAuthProvider";

export const UserImageContext = createContext({});

export const GetImagePath = (props) => {
  const { authState } = useContext(UserAuthContext);
  const { data, error } = useQuery(USER_IMAGE, {
    variables: { id: !authState.id ? 1 : Number(authState.id) },
    client: client,
  });
  if (error) return null;
  if (data) {
    const path = data.userImage.path;
    return path;
  }
};

export const UserImageProvider = (props) => {
  const { children } = props;
  const path = GetImagePath();
  const [imageState, setImageState] = useState("");
  const uri = !path ? "" : `http://www.moview-ori.com${path}`;
  useEffect(() => {
    axios
      .get(uri, { responseType: "blob" })
      .then((res) => {
        setImageState([URL.createObjectURL(res.data)]);
      })
      .catch((err) => {
        return null;
      });
  }, [uri]);
  return (
    <>
      <Loader state={false} />
      <UserImageContext.Provider value={{ uri, imageState, setImageState }}>
        {children}
      </UserImageContext.Provider>
    </>
  );
};
