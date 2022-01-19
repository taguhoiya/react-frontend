import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Demo from "./containers/Demo.jsx";
import { Login } from "./containers/auth/Login.jsx";
import { Register } from "./containers/auth/Register.jsx";
import { Profile } from "./components/UserProfile/Profile.jsx";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import { ApolloProvider } from "@apollo/client";
import { client } from "./components/client.js";
import { Verify } from "./containers/auth/Verify.jsx";

const options = {
  position: positions.MIDDLE,
};

const App = function () {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Provider template={AlertMUITemplate} {...options}>
          <Routes>
            <Route path="/" element={<Demo />} />
            <Route path="movies/:num" element={<Demo />} />
            <Route path="marks/:num" element={<Demo />} />
            <Route path="user/:userId/profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="verify" element={<Verify />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
