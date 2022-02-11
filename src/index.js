import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserAuthProvider } from "./components/providers/UserAuthProvider";
import { UserImageProvider } from "./components/providers/UserImageProvider";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const date = new Date();
const nowUnix = Math.floor(date.getTime() / 1000);
const expiry = nowUnix + 604800;
localStorage.setItem("expiry", expiry);
if (parseInt(localStorage["expiry"]) < nowUnix) {
  localStorage.clear();
}

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserAuthProvider>
        <UserImageProvider>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserImageProvider>
      </UserAuthProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
