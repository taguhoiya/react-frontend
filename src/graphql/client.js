import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const context = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "access-token": localStorage.getItem("accessToken") || null,
      client: localStorage.getItem("client") || null,
      uid: localStorage.getItem("uid") || null,
    },
  }));
  return forward(operation);
});

const link = new createHttpLink({ uri: "http://localhost:3000/graphql" });
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: context.concat(link),
});

const pageCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        moviesAll: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
  },
});

export const moviePageClient = new ApolloClient({
  cache: pageCache,
  link: context.concat(link),
});

const authLink = new createHttpLink({
  uri: "http://localhost:3000/graphql_auth",
});

export const clientAuth = new ApolloClient({
  cache: new InMemoryCache(),
  link: context.concat(authLink),
});

export const clientUpload = new ApolloClient({
  cache: new InMemoryCache(),
  link: new createUploadLink({ uri: "http://localhost:3000/graphql" }),
});
