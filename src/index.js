import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserAuthProvider } from "./components/providers/UserAuthProvider";
import { UserImageProvider } from "./components/providers/UserImageProvider";
import { ApolloProvider } from "@apollo/client";
import { client } from "./components/client";

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserAuthProvider>
        <UserImageProvider>
          <App />
        </UserImageProvider>
      </UserAuthProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
