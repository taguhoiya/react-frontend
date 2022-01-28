import { createContext, memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import { client } from "../../graphql/client";
import { Loader } from "../accessories/Loader";
import { useQuery } from "@apollo/client";
import { USER_IMAGE } from "../../graphql/queries";
import { UserAuthContext } from "./UserAuthProvider";

export const UserImageContext = createContext({});

export const GetImagePath = () => {
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

export const UserImageProvider = memo((props) => {
  const { children } = props;
  const [imageState, setImageState] = useState("");
  const path = GetImagePath();
  const uri = !path ? "" : `https://www.moview-ori.com${path}`;
  useEffect(() => {
    axios
      .get(uri, { responseType: "blob" })
      .then((res) => {
        setImageState([URL.createObjectURL(res.data)]);
      })
      .catch((e) => {
        console.log(e);
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
});
