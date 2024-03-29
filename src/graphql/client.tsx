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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        publicUser: {
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

const link = createHttpLink({ uri: "https://www.moview-ori.com/graphql" });

export const client = new ApolloClient({
  cache,
  link: context.concat(link),
});

const pageCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchMovies: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
          read(existing) {
            return existing;
          },
        },
        searchMarks: {
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

const authLink = createHttpLink({
  uri: "https://www.moview-ori.com/graphql_auth",
});

export const clientAuth = new ApolloClient({
  cache,
  link: context.concat(authLink),
});

export const clientUpload = new ApolloClient({
  cache: new InMemoryCache(),
  link: new createUploadLink({ uri: "https://www.moview-ori.com/graphql" }),
});
