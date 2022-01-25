import { BrowserRouter, Route, Routes } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import { Verify } from "./containers/Verify.jsx";
import { Login } from "./containers/Login.jsx";
import { Register } from "./containers/Register.jsx";
import { Profile } from "./components/userProfile/Profile.jsx";
import { AuthenticatedRoute } from "./components/routes/AuthenticatedRoute.jsx";
import { UnauthenticatedRoute } from "./components/routes/UnauthenticatedRoute.jsx";
import { Dashboard } from "./containers/DashBoard.jsx";
import { UserInfoProvider } from "./components/providers/UserInfoProvider.jsx";
import { DashBoardProvider } from "./components/providers/DashBoardProvider.jsx";
import { memo } from "react";

const options = {
  position: positions.MIDDLE,
};

export const App = memo(() =>  {
  return (
    <BrowserRouter>
      <Provider template={AlertMUITemplate} {...options}>
        <Routes>
          <Route exact path="/" element={<UnauthenticatedRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/verify" element={<Verify />} />
          <Route exact path="/" element={<AuthenticatedRoute />}>
            <Route
              path="/"
              element={
                <DashBoardProvider>
                  <Dashboard />
                </DashBoardProvider>
              }
            />
            <Route
              path="movies/:num"
              element={
                <DashBoardProvider>
                  <Dashboard />
                </DashBoardProvider>
              }
            />
            <Route
              path="marks/:num"
              element={
                <DashBoardProvider>
                  <Dashboard />
                </DashBoardProvider>
              }
            />
            <Route
              path="user/:userId/profile"
              element={
                <UserInfoProvider>
                  <Profile />
                </UserInfoProvider>
              }
            />
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
});

