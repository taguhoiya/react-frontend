import { useQuery } from "@apollo/client";
import { createContext, memo, useState } from "react";
import { MOVIE_PAGES } from "../../graphql/queries";
import { Loader } from "../accessories/Loader";

export const MovieCardContext = createContext({});

export const MovieCardProvider = memo((props) => {
  const { children, num } = props;
  const [page, setPage] = useState(num);
  const [params, setParams] = useState("");
  const [formState, setFormState] = useState("");
  const { loading, error, data, refetch } = useQuery(MOVIE_PAGES, {
    variables: { page: !page ? 1 : page, limit: 12, category: params, movieName: formState },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    return (
      <MovieCardContext.Provider
        value={{
          refetch,
          page,
          data,
          params,
          setPage,
          setParams,
          formState,
          setFormState,
        }}
      >
        {children}
      </MovieCardContext.Provider>
    );
  }
});
