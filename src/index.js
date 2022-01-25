import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App} from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserAuthProvider } from "./components/providers/UserAuthProvider";
import { UserImageProvider } from "./components/providers/UserImageProvider";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserAuthProvider>
        <UserImageProvider>
          <CssBaseline />
          <App />
        </UserImageProvider>
      </UserAuthProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
