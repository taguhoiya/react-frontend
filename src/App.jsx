import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import { Verify } from "./containers/auth/Verify.jsx";
import { Login } from "./containers/auth/Login.jsx";
import { Register } from "./containers/auth/Register.jsx";
import { Demo } from "./containers/Demo.jsx";
import { Profile } from "./components/UserProfile/Profile.jsx";
import { AuthenticatedRoute } from "./components/cards/Routes/AuthenticatedRoute.jsx";
import { UnauthenticatedRoute } from "./components/cards/Routes/UnauthenticatedRoute.jsx";

const options = {
  position: positions.MIDDLE,
};

const App = function () {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Provider template={AlertMUITemplate} {...options}>
        <Routes>
          <Route exact path="/" element={<UnauthenticatedRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
          </Route>
          <Route exact path="/" element={<AuthenticatedRoute />}>
            <Route path="/" element={<Demo />} />
            <Route path="movies/:num" element={<Demo />} />
            <Route path="marks/:num" element={<Demo />} />
            <Route path="user/:userId/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Register />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Theres nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
